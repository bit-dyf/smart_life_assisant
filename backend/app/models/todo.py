from datetime import datetime
from typing import Optional
from sqlalchemy import Column, ForeignKey, String, DateTime, Enum
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class TodoItem(Base):
    """待办事项数据库模型"""
    
    __tablename__ = "todo_items"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    time_begin = Column(DateTime(timezone=True), nullable=True)
    time_end = Column(DateTime(timezone=True), nullable=True)
    timestamp = Column(DateTime(timezone=True), default=datetime.now, nullable=False)
    time_notify = Column(DateTime(timezone=True), nullable=True)
    where_to_go = Column(String, nullable=True)
    state = Column(
        Enum("doing", "todo", "done", "pending", name="todo_state_enum"),
        default="todo",
        nullable=False
    )
    
    # 外键关联用户表
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="todo_items")
    
    def __repr__(self) -> str:
        """模型字符串表示"""
        return f"<TodoItem(id={self.id}, title='{self.title}', state='{self.state}')>" 