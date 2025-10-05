from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.auth import UserCreate, UserResponse, UserLogin, Token, UserUpdate
from app.services.auth_service import UserService
from app.core.security import get_current_user
from typing import List
from datetime import datetime
import logging

router = APIRouter()
logger = logging.getLogger(__name__)
user_service = UserService()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        new_user = user_service.create_user(db, user)
        return new_user
    except ValueError as e:
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected registration error: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error during registration")

@router.post("/login", response_model=Token)
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    authenticated_user = user_service.authenticate_user(db, user.email, user.password)
    if not authenticated_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password", headers={"WWW-Authenticate": "Bearer"})
    
    if not authenticated_user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User account is deactivated")
    
    authenticated_user.last_active = datetime.utcnow()
    db.commit()
    
    token = user_service.create_access_token_for_user(authenticated_user)
    return token


@router.get("/users/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "token": current_user.token  # attach current token if needed
    }


@router.put("/users/me", response_model=UserResponse)
async def update_user_info(user_data: UserUpdate, current_user: UserResponse = Depends(get_current_user), db: Session = Depends(get_db)):
    updated_user = await user_service.update_user(db, current_user.id, user_data.dict(exclude_unset=True))
    if not updated_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return updated_user

@router.delete("/users/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_account(current_user: UserResponse = Depends(get_current_user), db: Session = Depends(get_db)):
    success = await user_service.delete_user(db, current_user.id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return None

@router.get("/users/{user_id}", response_model=UserResponse)
async def get_user_by_id(user_id: int, current_user: UserResponse = Depends(get_current_user), db: Session = Depends(get_db)):
    user = await user_service.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@router.get("/users", response_model=List[UserResponse])
async def get_all_users(current_user: UserResponse = Depends(get_current_user), db: Session = Depends(get_db)):
    users = await user_service.get_all_active_users(db)
    return users