from pydantic import BaseModel, EmailStr

class StudentCreate(BaseModel):
    name: str
    mobile: str
    email: EmailStr | None = None
    password: str
    confirm_password: str

class StudentLogin(BaseModel):
    mobile: str | None = None
    email: EmailStr | None = None
    password: str

class OTPVerification(BaseModel):
    mobile: str
    otp: str

class ResetPassword(BaseModel):
    mobile: str
    otp: str
    new_password: str
    confirm_password: str
