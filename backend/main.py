from fastapi import FastAPI, Query, Depends, HTTPException
from sqlalchemy.orm import Session
import uvicorn
from pathlib import Path
from fastapi.responses import HTMLResponse, FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

import schemas, crud, auth
from database import get_db, engine, Base

# Create tables
Base.metadata.create_all(bind=engine)
app = FastAPI()

# ---------------------------
# STATIC FILES
# ---------------------------
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

# ---------------------------
# AUTHENTICATION
# ---------------------------

# ✅ Signup - New Student
@app.post("/signup")
def signup(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    if student.password != student.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    if crud.get_student_by_mobile(db, student.mobile):
        raise HTTPException(status_code=400, detail="Mobile already registered")

    if student.email and crud.get_student_by_email(db, student.email):
        raise HTTPException(status_code=400, detail="Email already registered")

    crud.create_student(db, student)
    # Redirect to student dashboard after signup
    return RedirectResponse(url="/student", status_code=303)


# ✅ Login
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

    # Redirect to student dashboard after login
    return RedirectResponse(url="/student", status_code=303)


# ✅ Student Dashboard Page
@app.get("/student", response_class=HTMLResponse)
def student_page():
    html_path = Path(__file__).parent.parent / "src" / "pages" / "student.html"
    if not html_path.exists():
        return "<h2>🎓 Welcome Student!</h2><p>Create <b>student.html</b> in src/pages/ to customize dashboard.</p>"
    return html_path.read_text(encoding="utf-8")


# ---------------------------
# STARTING SERVER
# ---------------------------
def main():
    uvicorn.run(app, host="127.0.0.1", port=3002, reload=True)

if __name__ == "__main__":
    main()
