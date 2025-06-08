from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Path, Query
from sqlalchemy.orm import Session

from app import schemas, models
from app.api import deps
from app.services import todo_service

router = APIRouter()


@router.get("/", response_model=List[schemas.TodoItem])
async def get_todos(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """
    获取当前用户的待办事项列表
    """
    return todo_service.get_todos_by_user(db=db, user_id=current_user.id, skip=skip, limit=limit)


@router.post("/", response_model=schemas.TodoItem)
async def create_todo(
    todo_in: schemas.TodoItemCreate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """
    创建新的待办事项
    """
    return todo_service.create_todo(db=db, todo_in=todo_in, user_id=current_user.id)


@router.get("/{todo_id}", response_model=schemas.TodoItem)
async def get_todo(
    todo_id: str = Path(..., description="待办事项的ID"),
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """
    通过ID获取指定的待办事项
    """
    todo = todo_service.get_todo(db=db, todo_id=todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="待办事项未找到")
    if todo.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="无权访问此待办事项")
    return todo


@router.put("/{todo_id}", response_model=schemas.TodoItem)
async def update_todo(
    todo_in: schemas.TodoItemUpdate,
    todo_id: str = Path(..., description="待办事项的ID"),
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """
    更新指定的待办事项
    """
    todo = todo_service.get_todo(db=db, todo_id=todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="待办事项未找到")
    if todo.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="无权修改此待办事项")
    return todo_service.update_todo(db=db, todo=todo, todo_in=todo_in)


@router.delete("/{todo_id}", response_model=schemas.TodoItem)
async def delete_todo(
    todo_id: str = Path(..., description="待办事项的ID"),
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """
    删除指定的待办事项
    """
    todo = todo_service.get_todo(db=db, todo_id=todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="待办事项未找到")
    if todo.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="无权删除此待办事项")
    return todo_service.delete_todo(db=db, todo_id=todo_id) 