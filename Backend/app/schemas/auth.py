from pydantic import BaseModel, EmailStr
from typing import Optional

# Base user info
class UserBase(BaseModel):
    username: str
    email: EmailStr

# For signup (keep 'name')
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

# For login
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Token response
class Token(BaseModel):
    access_token: str
    token_type: str

# For returning user info
class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    token: Optional[str] = None

    class Config:
        orm_mode = True

# Optional: password reset schemas
class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordReset(BaseModel):
    token: str
    new_password: str
