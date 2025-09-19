from pydantic import BaseModel, EmailStr
from typing import Optional

class TeacherCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    confirm_password: str


class TeacherLogin(BaseModel):
    email: EmailStr
    password: str
    
class StudentCreate(BaseModel):
    name: str
    mobile: str
    email: Optional[str]
    password: str
    confirm_password: str

class StudentLogin(BaseModel):
    mobile: Optional[str]
    email: Optional[str]
    password: str

class PasswordReset(BaseModel):
    mobile: str
    new_password: str
    confirm_password: str
