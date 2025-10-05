from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import jwt, JWTError

from app.schemas.auth import UserCreate, UserLogin, UserResponse, PasswordResetRequest, PasswordReset
from app.utils.auth_utils import create_access_token, verify_password, hash_password
from app.utils.email import send_password_reset_email, send_welcome_email
from app.database.session import get_db
from app.models.user import User
from app.config import get_settings

settings = get_settings()

router = APIRouter(tags=["Authentication"])


# ✅ Signup
@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)
    new_user = User(username=user.name, email=user.email, password_hash=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({"sub": new_user.email})
    return {"id": new_user.id, "username": new_user.username, "email": new_user.email, "token": token}

# ✅ Login
@router.post("/login", response_model=UserResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": db_user.email})
    return {"id": db_user.id, "username": db_user.username, "email": db_user.email, "token": token}



@router.post("/forgot-password")
async def forgot_password(request: PasswordResetRequest, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == request.email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    reset_token = create_access_token({"sub": db_user.email}, expires_delta=3600)

    await send_password_reset_email(db_user, reset_token)

    return {"message": "Password reset email sent"}


@router.post("/reset-password")
def reset_password(data: PasswordReset, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(data.token, settings.SECRET_KEY, algorithms=["HS256"])
        email: str = payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    db_user = db.query(User).filter(User.email == email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.password_hash = hash_password(data.new_password)
    db.commit()
    db.refresh(db_user)

    return {"message": "Password reset successfully"}
