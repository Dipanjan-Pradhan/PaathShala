from sqlalchemy.orm import Session
from models import Teacher, Student
from auth import hash_password
import secrets

# ---------------------------
# TEACHER CRUD
# ---------------------------
def create_teacher(db: Session, teacher_data):
    code = secrets.token_hex(4)  # 8-character unique code
    hashed_pw = hash_password(teacher_data.password)
    teacher = Teacher(
        name=teacher_data.name,
        email=teacher_data.email,
        hashed_password=hashed_pw,
        code=code
    )
    db.add(teacher)
    db.commit()
    db.refresh(teacher)
    return teacher


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
