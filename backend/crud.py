from sqlalchemy.orm import Session
from typing import Optional

from database import SessionLocal
from models import Student, Teacher
import auth
import schemas


def get_student_by_mobile(db: Session, mobile: str) -> Optional[Student]:
    return db.query(Student).filter(Student.mobile == mobile).first()


def get_student_by_email(db: Session, email: str) -> Optional[Student]:
    return db.query(Student).filter(Student.email == email).first()


def create_student(db: Session, student: schemas.StudentCreate) -> Student:
    hashed_password = auth.hash_password(student.password)
    db_student = Student(
        name=student.name,
        mobile=student.mobile,
        email=student.email,
        hashed_password=hashed_password,
        is_verified=False,
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student


def update_password(db: Session, mobile: str, new_password: str) -> None:
    student = get_student_by_mobile(db, mobile)
    if not student:
        return
    student.hashed_password = auth.hash_password(new_password)
    db.commit()


def update_student_profile(db: Session, current_mobile: str, name: str, mobile: str, email: str) -> Student:
    student = get_student_by_mobile(db, current_mobile)
    if not student:
        return None

    # Update fields if provided
    if name:
        student.name = name
    if mobile:
        student.mobile = mobile
    if email is not None:  # Allow empty string to clear email
        student.email = email

    db.commit()
    db.refresh(student)
    return student


# Teacher helpers
def get_teacher_by_email(db: Session, email: str) -> Optional[Teacher]:
    return db.query(Teacher).filter(Teacher.email == email).first()


def create_teacher(db: Session, teacher: schemas.TeacherCreate) -> Teacher:
    hashed_password = auth.hash_password(teacher.password)
    db_teacher = Teacher(
        name=teacher.name,
        email=teacher.email,
        hashed_password=hashed_password,
        is_verified=False,
    )
    db.add(db_teacher)
    db.commit()
    db.refresh(db_teacher)
    return db_teacher
