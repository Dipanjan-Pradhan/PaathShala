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
      
@app.get("/", response_class=HTMLResponse)
async def root():
    html_path = Path(__file__).parent.parent / "src" / "pages" / "index.html"
    return html_path.read_text(encoding="utf-8")

# Signup - New Student
@app.get("/signup", response_class=HTMLResponse)
def signup(
    name: str = Query(...),
    mobile: str = Query(...),
    email: str | None = Query(None),
    password: str = Query(...),
    confirm_password: str = Query(...),
    db: Session = Depends(get_db),
):
    if password != confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    if crud.get_student_by_mobile(db, mobile):
        raise HTTPException(status_code=400, detail="Mobile already registered")
    if email and crud.get_student_by_email(db, email):
        raise HTTPException(status_code=400, detail="Email already registered")

    student_data = schemas.StudentCreate(
        name=name, mobile=mobile, email=email,
        password=password, confirm_password=confirm_password
    )
    db_student = crud.create_student(db, student_data)
    return f"<h2>Student created successfully!</h2><p>Use OTP: <b>{db_student.otp}</b> to verify.</p>"

# Verify OTP
@app.get("/verify-otp", response_class=HTMLResponse)
def verify_otp(
    mobile: str = Query(...),
    otp: str = Query(...),
    db: Session = Depends(get_db)
):
    student = crud.verify_otp(db, mobile, otp)
    if not student:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    return "<h2>✅ OTP verified successfully! You can now log in.</h2>"

# Login
@app.get("/login", response_class=HTMLResponse)
def login(
    mobile: str | None = Query(None),
    email: str | None = Query(None),
    password: str = Query(...),
    db: Session = Depends(get_db)
):
    db_student = None
    if mobile:
        db_student = crud.get_student_by_mobile(db, mobile)
    elif email:
        db_student = crud.get_student_by_email(db, email)

    if not db_student:
        raise HTTPException(status_code=400, detail="Student not found")
    if not auth.verify_password(password, db_student.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    if not db_student.is_verified:
        raise HTTPException(status_code=400, detail="OTP not verified")

    token = auth.create_access_token({"sub": db_student.mobile})
    return f"<h2>🎉 Welcome {db_student.name}!</h2><p>Login successful. Token: <b>{token}</b></p>"

# Forgot Password - Send OTP
@app.get("/forgot-password", response_class=HTMLResponse)
def forgot_password(mobile: str = Query(...), db: Session = Depends(get_db)):
    student = crud.get_student_by_mobile(db, mobile)
    if not student:
        raise HTTPException(status_code=400, detail="Student not found")
    student.otp = auth.generate_otp()
    db.commit()
    return f"<h2>📩 OTP sent for password reset!</h2><p>Use OTP: <b>{student.otp}</b></p>"

# Reset Password
@app.get("/reset-password", response_class=HTMLResponse)
def reset_password(
    mobile: str = Query(...),
    otp: str = Query(...),
    new_password: str = Query(...),
    confirm_password: str = Query(...),
    db: Session = Depends(get_db)
):
    if new_password != confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    student = crud.verify_otp(db, mobile, otp)
    if not student:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    crud.update_password(db, mobile, new_password)
    return "<h2>✅ Password reset successfully! Please log in again.</h2>"

# -------------------
# AUTHENTICATION APIs
# -------------------

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


# Starting server
def main():
    print("Hello")
    uvicorn.run(app, host='127.0.0.1', port=3002)

if __name__ == "__main__":
    main()
