from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    mobile = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=True)
    hashed_password = Column(String, nullable=False)

    # NEW: link to Teacher via code
    teacher_code = Column(String, ForeignKey("teachers.code"), nullable=True)

    # Relationship to Teacher (optional, but nice to have)
    teacher = relationship("Teacher", back_populates="students")


class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    code = Column(String, unique=True, index=True)  # teacher’s unique code

    # Back reference
    students = relationship("Student", back_populates="teacher")
