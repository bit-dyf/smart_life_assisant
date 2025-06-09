from typing import List
from sqlalchemy import Boolean, Column, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class User(Base):
    """用户数据库模型"""
    
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    
    # 与TodoItem关系
    todo_items = relationship("TodoItem", back_populates="user")
    
    def __repr__(self) -> str:
        """模型字符串表示"""
        return f"<User(id={self.id}, email='{self.email}', username='{self.username}')>" 