from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import uvicorn
from database import get_db, engine, Base
import schemas, crud, auth
from pathlib import Path
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles


Base.metadata.create_all(bind=engine)
app = FastAPI()

# Serving static files
BASE_DIR = Path(__file__).resolve().parent.parent
app.mount("/assets", StaticFiles(directory=BASE_DIR / "assets" / "img"), name="assets")
app.mount("/static", StaticFiles(directory=BASE_DIR / "src" / "static"), name="static")


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse(BASE_DIR / "assets" / "img" / "PaathShala.jpg")

def main():
    print("Hello")
    uvicorn.run(app, host='127.0.0.1', port=3002)
      
@app.get("/", response_class=HTMLResponse)
async def root():
    html_path = Path(__file__).parent.parent / "src" / "pages" / "index.html"
    return html_path.read_text(encoding="utf-8")

# Signup - New Student
@app.post("/signup")
def signup(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    if student.password != student.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    if crud.get_student_by_mobile(db, student.mobile):
        raise HTTPException(status_code=400, detail="Mobile already registered")
    if student.email and crud.get_student_by_email(db, student.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    db_student = crud.create_student(db, student)
    # Here you would send OTP via SMS in real app
    return {"message": "Student created, OTP sent", "otp": db_student.otp}  # For testing, show OTP

# Verify OTP
@app.post("/verify-otp")
def verify_otp(data: schemas.OTPVerification, db: Session = Depends(get_db)):
    student = crud.verify_otp(db, data.mobile, data.otp)
    if not student:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    return {"message": "OTP verified successfully"}

# Login
@app.post("/login")
def login(student: schemas.StudentLogin, db: Session = Depends(get_db)):
    db_student = None
    if student.mobile:
        db_student = crud.get_student_by_mobile(db, student.mobile)
    elif student.email:
        db_student = crud.get_student_by_email(db, student.email)
    if not db_student:
        raise HTTPException(status_code=400, detail="Student not found")
    if not auth.verify_password(student.password, db_student.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    if not db_student.is_verified:
        raise HTTPException(status_code=400, detail="OTP not verified")
    token = auth.create_access_token({"sub": db_student.mobile})
    return {"access_token": token, "token_type": "bearer"}

# Forgot Password - Send OTP
@app.post("/forgot-password")
def forgot_password(mobile: str, db: Session = Depends(get_db)):
    student = crud.get_student_by_mobile(db, mobile)
    if not student:
        raise HTTPException(status_code=400, detail="Student not found")
    student.otp = auth.generate_otp()
    db.commit()
    # Here you would send OTP via SMS in real app
    return {"message": "OTP sent for password reset", "otp": student.otp}  # For testing

# Reset Password
@app.post("/reset-password")
def reset_password(data: schemas.ResetPassword, db: Session = Depends(get_db)):
    if data.new_password != data.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    student = crud.verify_otp(db, data.mobile, data.otp)
    if not student:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    crud.update_password(db, data.mobile, data.new_password)
    return {"message": "Password reset successfully"}


if __name__ == "__main__":
    main()
