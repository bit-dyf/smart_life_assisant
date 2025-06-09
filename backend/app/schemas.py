from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


# 基础TodoItem模型
class TodoItemBase(BaseModel):
    """待办事项基础Schema"""
    title: str
    time_begin: Optional[datetime] = None
    time_end: Optional[datetime] = None
    time_notify: Optional[datetime] = None
    where_to_go: Optional[str] = None
    state: str = "todo"


class TodoItemCreate(TodoItemBase):
    """创建待办事项的Schema"""
    pass


class TodoItemUpdate(TodoItemBase):
    """更新待办事项的Schema"""
    title: Optional[str] = None


class TodoItem(TodoItemBase):
    """待办事项完整Schema（包含数据库字段）"""
    id: str
    timestamp: datetime
    user_id: str

    class Config:
        from_attributes = True


# 基础User模型
class UserBase(BaseModel):
    """用户基础Schema"""
    email: str
    username: str


class UserCreate(UserBase):
    """创建用户的Schema"""
    password: str


class UserUpdate(BaseModel):
    """更新用户的Schema"""
    email: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None


class User(UserBase):
    """用户完整Schema（包含数据库字段）"""
    id: str
    is_active: bool
    is_admin: bool = False
    todo_items: List[TodoItem] = []

    class Config:
        from_attributes = True


# Token模型
class Token(BaseModel):
    """访问令牌Schema"""
    access_token: str
    token_type: str


class TokenPayload(BaseModel):
    """令牌载荷Schema"""
    sub: str = None
    exp: int = None 