from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import JSONResponse, FileResponse, HTMLResponse
from sqlalchemy.orm import Session
from pathlib import Path
import uvicorn

from database import get_db, engine, Base
import schemas, crud, auth
from fastapi.staticfiles import StaticFiles

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
# AUTHENTICATION APIs (JSON)
# -------------------

# Signup
@app.post("/signup")
def signup(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    if student.password != student.confirm_password:
        return JSONResponse({"success": False, "detail": "Passwords do not match"}, status_code=400)
    if crud.get_student_by_mobile(db, student.mobile):
        return JSONResponse({"success": False, "detail": "Mobile already registered"}, status_code=400)
    if student.email and crud.get_student_by_email(db, student.email):
        return JSONResponse({"success": False, "detail": "Email already registered"}, status_code=400)

    crud.create_student(db, student)
    return JSONResponse({"success": True, "redirect": "/student"})

# Login
@app.post("/login")
def login(credentials: schemas.StudentLogin, db: Session = Depends(get_db)):
    db_student = crud.get_student_by_mobile(db, credentials.mobile) if credentials.mobile else crud.get_student_by_email(db, credentials.email)
    if not db_student:
        return JSONResponse({"success": False, "detail": "Student not found"}, status_code=400)
    if not auth.verify_password(credentials.password, db_student.hashed_password):
        return JSONResponse({"success": False, "detail": "Incorrect password"}, status_code=400)

    # For your frontend: redirect to /student
    return JSONResponse({"success": True, "redirect": "/student", "access_token": "dummy_token"})

# Forgot Password
@app.post("/reset-password")
def reset_password(reset: schemas.PasswordReset, db: Session = Depends(get_db)):
    student = crud.get_student_by_mobile(db, reset.mobile)
    if not student:
        return JSONResponse({"success": False, "detail": "Student not found"}, status_code=400)
    if reset.new_password != reset.confirm_password:
        return JSONResponse({"success": False, "detail": "Passwords do not match"}, status_code=400)

    crud.update_password(db, reset.mobile, reset.new_password)
    return JSONResponse({"success": True, "detail": "Password reset successfully"})

# -------------------
# START SERVER
# -------------------
def main():
    print("🚀 Server running at http://127.0.0.1:3002")
    uvicorn.run(app, host="127.0.0.1", port=3002)

if __name__ == "__main__":
    main()
