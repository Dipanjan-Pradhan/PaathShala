from fastapi import FastAPI, Query, Depends, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
import uvicorn
import webbrowser

from database import get_db, engine, Base
import schemas, crud, auth
from pathlib import Path
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles

# Initialize DB
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
    html_path = BASE_DIR / "src" / "pages" / "index.html"
    return html_path.read_text(encoding="utf-8")

@app.get("/student", response_class=HTMLResponse)
async def root():
    html_path = BASE_DIR / "src" / "pages" / "student.html"
    return html_path.read_text(encoding="utf-8")

@app.get("/profile", response_class=HTMLResponse)
async def root():
    html_path = BASE_DIR / "src" / "pages" / "profile.html"
    return html_path.read_text(encoding="utf-8")

@app.get("/game", response_class=HTMLResponse)
async def root():
    html_path = BASE_DIR / "src" / "pages" / "game1.html"
    return html_path.read_text(encoding="utf-8")

# -------------------
# AUTHENTICATION APIs (GET version)
# -------------------

# Signup - New Student
@app.post("/signup", response_class=HTMLResponse)
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
    crud.create_student(db, student_data)
    
    # Redirect to /student route
    return RedirectResponse(url="/student")

# Login
@app.post("/login", response_class=HTMLResponse)
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

    # Redirect to /student route
    return RedirectResponse(url="/student")

# -------------------
# START SERVER
# -------------------
def main():
    url = "http://127.0.0.1:3002"
    print(f"🚀 Server running at {url}")
    uvicorn.run(app, host="127.0.0.1", port=3002)

if __name__ == "__main__":
    main()
