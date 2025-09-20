from fastapi import FastAPI, Depends, File, UploadFile
from fastapi.responses import JSONResponse, FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from pathlib import Path
import uvicorn

from database import get_db, engine, Base
import schemas, crud
from passlib.context import CryptContext

# -------------------
# Password Hashing Setup
# -------------------
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# -------------------
# Initialize DB
# -------------------
Base.metadata.create_all(bind=engine)
app = FastAPI()

# -------------------
# Serving static files
# -------------------
BASE_DIR = Path(__file__).resolve().parent.parent
app.mount("/assets", StaticFiles(directory=BASE_DIR / "assets" / "img"), name="assets")
app.mount("/static", StaticFiles(directory=BASE_DIR / "src" / "static"), name="static")

# -------------------
# Static pages
# -------------------
@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse(BASE_DIR / "assets" / "img" / "PaathShala.jpg")

@app.get("/", response_class=HTMLResponse)
async def root():
    html_path = BASE_DIR / "src" / "pages" / "index.html"
    return html_path.read_text(encoding="utf-8")

@app.get("/student", response_class=HTMLResponse)
async def student_page():
    html_path = BASE_DIR / "src" / "pages" / "student.html"
    return html_path.read_text(encoding="utf-8")

@app.get("/profile", response_class=HTMLResponse)
async def profile_page():
    html_path = BASE_DIR / "src" / "pages" / "profile.html"
    return html_path.read_text(encoding="utf-8")

@app.get("/game", response_class=HTMLResponse)
async def game_page():
    html_path = BASE_DIR / "src" / "pages" / "game1.html"
    return html_path.read_text(encoding="utf-8")

@app.get("/teacher", response_class=HTMLResponse)
async def teacher_page():
    html_path = BASE_DIR / "src" / "pages" / "teacher.html"
    return html_path.read_text(encoding="utf-8")

@app.get("/teacherprofile", response_class=HTMLResponse)
async def teacher_page():
    html_path = BASE_DIR / "src" / "pages" / "teacherprofile.html"
    return html_path.read_text(encoding="utf-8")

@app.get("/quiz10English", response_class=HTMLResponse)
async def teacher_page():
    html_path = BASE_DIR / "src" / "pages" / "quiz10English.html"
    return html_path.read_text(encoding="utf-8")

@app.get("/quiz10EnglishResult", response_class=HTMLResponse)
async def teacher_page():
    html_path = BASE_DIR / "src" / "pages" / "quiz10EnglishResult.html"
    return html_path.read_text(encoding="utf-8")

# -------------------
# STUDENT AUTH APIs
# -------------------
@app.post("/student/signup")
def signup(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    if student.password != student.confirm_password:
        return JSONResponse({"success": False, "detail": "Passwords do not match"}, status_code=400)
    if crud.get_student_by_mobile(db, student.mobile):
        return JSONResponse({"success": False, "detail": "Mobile already registered"}, status_code=400)
    if student.email and crud.get_student_by_email(db, student.email):
        return JSONResponse({"success": False, "detail": "Email already registered"}, status_code=400)

    # hash the password before saving
    student_db = crud.create_student(db, student)
    return JSONResponse({
        "success": True,
        "redirect": "/student",
        "access_token": "dummy_token",
        "id": student_db.id,
        "name": student_db.name,
        "mobile": student_db.mobile,
        "email": student_db.email
    })

@app.post("/student/login")
def login(credentials: schemas.StudentLogin, db: Session = Depends(get_db)):
    db_student = (
        crud.get_student_by_mobile(db, credentials.mobile)
        if credentials.mobile
        else crud.get_student_by_email(db, credentials.email)
    )
    if not db_student:
        return JSONResponse({"success": False, "detail": "Student not found"}, status_code=400)
    if not verify_password(credentials.password, db_student.hashed_password):
        return JSONResponse({"success": False, "detail": "Incorrect password"}, status_code=400)

    return JSONResponse({
        "success": True,
        "redirect": "/student",
        "access_token": "dummy_token",
        "id": db_student.id,
        "name": db_student.name,
        "mobile": db_student.mobile,
        "email": db_student.email
})

# -------------------
# TEACHER AUTH APIs
# -------------------
@app.post("/teacher/signup")
def teacher_signup(teacher: schemas.TeacherCreate, db: Session = Depends(get_db)):
    if teacher.password != teacher.confirm_password:
        return JSONResponse({"success": False, "detail": "Passwords do not match"}, status_code=400)
    
    if crud.get_teacher_by_email(db, teacher.email):
        return JSONResponse({"success": False, "detail": "Email already registered"}, status_code=400)

    # hash password
    hashed_pw = hash_password(teacher.password)

    # create teacher in DB
    db_teacher = crud.create_teacher(
        db,
        name=teacher.name.strip(),
        email=teacher.email.strip(),
        hashed_password=hashed_pw
    )

    return JSONResponse({
        "success": True,
        "redirect": "/profile",
        "access_token": "dummy_token",
        "code": db_teacher.code,
        "name": db_teacher.name,
        "email": db_teacher.email
    })

@app.post("/teacher/login")
def teacher_login(credentials: schemas.TeacherLogin, db: Session = Depends(get_db)):
    db_teacher = crud.get_teacher_by_email(db, credentials.email)
    if not db_teacher:
        return JSONResponse({"success": False, "detail": "Teacher not found"}, status_code=400)
    if not verify_password(credentials.password, db_teacher.hashed_password):
        return JSONResponse({"success": False, "detail": "Incorrect password"}, status_code=400)

    return JSONResponse(
    {
        "success": True,
        "redirect": "/profile",
        "access_token": "dummy_token",
        "code": db_teacher.code,
        "name": db_teacher.name,
        "email": db_teacher.email
    }
)

# -------------------
# RELATIONSHIP APIs
# -------------------
@app.get("/teacher/{code}/students")
def get_students_for_teacher(code: str, db: Session = Depends(get_db)):
    students = crud.get_students_by_teacher_code(db, code)
    return students

@app.get("/student/{mobile}/teacher")
def get_teacher_for_student(mobile: str, db: Session = Depends(get_db)):
    student = crud.get_student_by_mobile(db, mobile)
    if not student or not student.teacher_code:
        return JSONResponse({"success": False, "detail": "No teacher linked"}, status_code=404)
    teacher = crud.get_teacher_by_code(db, student.teacher_code)
    if not teacher:
        return JSONResponse({"success": False, "detail": "Teacher not found"}, status_code=404)
    return teacher

# -------------------
# STUDENT PROFILE APIs
# -------------------

# Get Student Profile
@app.get("/student/profile")
def get_student_profile(mobile: str, db: Session = Depends(get_db)):
    student = crud.get_student_by_mobile(db, mobile)
    if not student:
        return JSONResponse({"success": False, "detail": "Student not found"}, status_code=404)

    return {
        "id": student.id,
        "name": student.name,
        "mobile": student.mobile,
        "email": student.email,
        "profile_picture": None,  # TODO: Add profile picture field to database
        "is_verified": student.is_verified
    }

# Update Student Profile
@app.put("/student/profile")
def update_student_profile(profile_data: dict, db: Session = Depends(get_db)):
    current_mobile = profile_data.get("current_mobile")
    name = profile_data.get("name")
    mobile = profile_data.get("mobile")
    email = profile_data.get("email")

    if not current_mobile:
        return JSONResponse({"success": False, "detail": "Current mobile number required"}, status_code=400)

    # Check if student exists
    student = crud.get_student_by_mobile(db, current_mobile)
    if not student:
        return JSONResponse({"success": False, "detail": "Student not found"}, status_code=404)

    # Check if new mobile already exists (if different)
    if mobile != current_mobile and crud.get_student_by_mobile(db, mobile):
        return JSONResponse({"success": False, "detail": "Mobile number already registered"}, status_code=400)

    # Check if new email already exists (if provided and different)
    if email and email != student.email and crud.get_student_by_email(db, email):
        return JSONResponse({"success": False, "detail": "Email already registered"}, status_code=400)

    # Update student data
    updated_student = crud.update_student_profile(db, current_mobile, name, mobile, email)

    return {
        "success": True,
        "detail": "Profile updated successfully",
        "data": {
            "id": updated_student.id,
            "name": updated_student.name,
            "mobile": updated_student.mobile,
            "email": updated_student.email
        }
    }

# Upload Profile Picture
@app.post("/student/upload-picture")
def upload_profile_picture(db: Session = Depends(get_db)):
    # TODO: Implement file upload logic
    # For now, return success with a placeholder
    return {
        "success": True,
        "detail": "Profile picture uploaded successfully",
        "image_url": "/assets/profile-placeholder.png"
    }

# Change Password
@app.put("/student/change-password")
def change_student_password(password_data: dict, db: Session = Depends(get_db)):
    mobile = password_data.get("mobile")
    current_password = password_data.get("current_password")
    new_password = password_data.get("new_password")

    if not all([mobile, current_password, new_password]):
        return JSONResponse({"success": False, "detail": "All fields are required"}, status_code=400)

    # Get student
    student = crud.get_student_by_mobile(db, mobile)
    if not student:
        return JSONResponse({"success": False, "detail": "Student not found"}, status_code=404)

    # Verify current password
    if not verify_password(current_password, student.hashed_password):
        return JSONResponse({"success": False, "detail": "Current password is incorrect"}, status_code=400)

    # Update password
    crud.update_password(db, mobile, hash_password(new_password))

    return {"success": True, "detail": "Password changed successfully"}


# -------------------
# TEACHER PROFILE APIs
# -------------------
@app.get("/teacherprofile/data")
def get_teacher_profile(email: str, db: Session = Depends(get_db)):
    db_teacher = crud.get_teacher_by_email(db, email)
    if not db_teacher:
        return JSONResponse({"success": False, "detail": "Email not found, please login again"}, status_code=404)
    
    return {
        "success": True,
        "code": db_teacher.code,
        "name": db_teacher.name,
        "email": db_teacher.email,
        "profile_picture": getattr(db_teacher, "profile_picture", None)
    }

@app.put("/teacherprofile")
def update_teacher_profile(profile_data: dict, db: Session = Depends(get_db)):
    email = profile_data.get("email")
    name = profile_data.get("name")
    if not email or not name:
        return JSONResponse({"success": False, "detail": "Email and name required"}, status_code=400)

    db_teacher = crud.get_teacher_by_email(db, email)
    if not db_teacher:
        return JSONResponse({"success": False, "detail": "Teacher not found"}, status_code=404)
    
    db_teacher.name = name.strip()
    db.commit()
    db.refresh(db_teacher)
    
    return {
        "success": True,
        "code": db_teacher.code,
        "name": db_teacher.name,
        "email": db_teacher.email
    }

@app.post("/teacher/upload-picture")
def upload_teacher_picture(email: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    db_teacher = crud.get_teacher_by_email(db, email)
    if not db_teacher:
        return JSONResponse({"success": False, "detail": "Teacher not found"}, status_code=404)
    
    # Save file
    ext = os.path.splitext(file.filename)[1]
    file_path = PROFILE_PIC_DIR / f"{db_teacher.code}{ext}"
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    
    db_teacher.profile_picture = f"/assets/profile_pictures/{db_teacher.code}{ext}"
    db.commit()
    db.refresh(db_teacher)
    
    return {"success": True, "image_url": db_teacher.profile_picture}


# -------------------
# START SERVER
# -------------------
def main():
    print("🚀 Server running at http://127.0.0.1:3002")
    uvicorn.run(app, host="127.0.0.1", port=3002)

if __name__ == "__main__":
    main()
