from fastapi import FastAPI, Depends
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
    student.password = hash_password(student.password)
    student.confirm_password = student.password
    crud.create_student(db, student)

    return JSONResponse({"success": True, "redirect": "/student"})

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

    return JSONResponse(
        {"success": True, "redirect": "/student", "access_token": "dummy_token"}
    )

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
    teacher.password = hash_password(teacher.password)
    teacher.confirm_password = teacher.password

    db_teacher = crud.create_teacher(db, teacher)
    return JSONResponse(
        {"success": True, "redirect": "/profile", "code": db_teacher.code}
    )

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
# START SERVER
# -------------------
def main():
    print("🚀 Server running at http://127.0.0.1:3002")
    uvicorn.run(app, host="127.0.0.1", port=3002)

if __name__ == "__main__":
    main()
