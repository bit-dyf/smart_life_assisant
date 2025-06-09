from typing import List, Optional
from uuid import uuid4
from sqlalchemy.orm import Session

from app import models, schemas


def get_todo(db: Session, todo_id: str) -> Optional[models.TodoItem]:
    """
    通过ID获取待办事项
    """
    return db.query(models.TodoItem).filter(models.TodoItem.id == todo_id).first()


def get_todos_by_user(
    db: Session, user_id: str, skip: int = 0, limit: int = 100
) -> List[models.TodoItem]:
    """
    获取用户的待办事项列表
    """
    return (
        db.query(models.TodoItem)
        .filter(models.TodoItem.user_id == user_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_todo(
    db: Session, todo_in: schemas.TodoItemCreate, user_id: str
) -> models.TodoItem:
    """
    创建新的待办事项
    """
    todo = models.TodoItem(
        id=str(uuid4()),
        title=todo_in.title,
        time_begin=todo_in.time_begin,
        time_end=todo_in.time_end,
        time_notify=todo_in.time_notify,
        where_to_go=todo_in.where_to_go,
        state=todo_in.state,
        user_id=user_id,
    )
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


def update_todo(
    db: Session, todo: models.TodoItem, todo_in: schemas.TodoItemUpdate
) -> models.TodoItem:
    """
    更新待办事项
    """
    update_data = todo_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(todo, field, value)
    
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


def delete_todo(db: Session, todo_id: str) -> models.TodoItem:
    """
    删除待办事项
    """
    todo = get_todo(db=db, todo_id=todo_id)
    db.delete(todo)
    db.commit()
    return todo 