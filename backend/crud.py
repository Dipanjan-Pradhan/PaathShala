from sqlalchemy.orm import Session
from models import Teacher, Student
from auth import hash_password
import models
import secrets

# ---------------------------
# TEACHER CRUD
# ---------------------------
def create_teacher(db: Session, name: str, email: str, hashed_password: str):
    import uuid
    db_teacher = models.Teacher(
        name=name,
        email=email,
        hashed_password=hashed_password,
        code=str(uuid.uuid4())[:8]  # generate unique code
    )
    db.add(db_teacher)
    db.commit()
    db.refresh(db_teacher)
    return db_teacher


def get_teacher_by_email(db: Session, email: str):
    return db.query(Teacher).filter(Teacher.email == email).first()


def get_teacher_by_code(db: Session, code: str):
    return db.query(Teacher).filter(Teacher.code == code).first()


# ---------------------------
# STUDENT CRUD
# ---------------------------
def create_student(db: Session, student_data):
    hashed_pw = hash_password(student_data.password)
    student = Student(
        name=student_data.name,
        mobile=student_data.mobile,
        email=student_data.email,
        hashed_password=hashed_pw,
        teacher_code=student_data.teacher_code  # optional
    )
    db.add(student)
    db.commit()
    db.refresh(student)
    return student


def get_student_by_mobile(db: Session, mobile: str):
    return db.query(Student).filter(Student.mobile == mobile).first()


def get_student_by_email(db: Session, email: str):
    return db.query(Student).filter(Student.email == email).first()


def get_students_by_teacher_code(db: Session, code: str):
    return db.query(Student).filter(Student.teacher_code == code).all()


# ---------------------------
# PASSWORD MANAGEMENT
# ---------------------------
def update_password(db: Session, mobile: str, new_password: str):
    student = get_student_by_mobile(db, mobile)
    if student:
        student.hashed_password = hash_password(new_password)
        db.commit()
        db.refresh(student)
    return student
