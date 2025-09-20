from pydantic import BaseModel, EmailStr
from typing import Optional, List

# ---------- TEACHER ----------

class TeacherCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    confirm_password: str

class TeacherLogin(BaseModel):
    email: EmailStr
    password: str

class TeacherOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    code: str   # unique teacher code

    class Config:
        from_attributes = True


# ---------- STUDENT ----------

class StudentCreate(BaseModel):
    name: str
    mobile: str
    email: Optional[str]
    password: str
    confirm_password: str
    teacher_code: Optional[str]  # NEW: link to teacher


class StudentLogin(BaseModel):
    mobile: Optional[str]
    email: Optional[str]
    password: str


class StudentOut(BaseModel):
    id: int
    name: str
    mobile: str
    email: Optional[str]
    teacher: Optional[TeacherOut]  # full teacher object instead of just code

    class Config:
        orm_mode = True


# ---------- PASSWORD RESET ----------

class PasswordReset(BaseModel):
    mobile: str
    new_password: str
    confirm_password: str
