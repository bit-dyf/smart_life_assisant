import pytest
from datetime import datetime, timedelta
from uuid import uuid4
from sqlalchemy.orm import Session

from app.models.todo import TodoItem
from app.schemas.todo import TodoItemCreate, TodoItemUpdate
from app.services.todo_service import create_todo, get_todo, get_todos_by_user, update_todo, delete_todo


# 创建测试数据的fixture
@pytest.fixture
def user_id():
    return str(uuid4())


@pytest.fixture
def todo_item(db: Session, user_id: str):
    """创建一个测试用的待办事项"""
    todo = TodoItem(
        id=str(uuid4()),
        title="测试待办事项",
        timestamp=datetime.now(),
        state="todo",
        user_id=user_id
    )
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


class TestTodoService:
    """待办事项服务单元测试"""

    def test_create_todo(self, db: Session, user_id: str):
        """测试创建待办事项功能"""
        todo_data = TodoItemCreate(
            title="创建测试待办",
            time_begin=datetime.now(),
            time_end=datetime.now() + timedelta(days=1),
            time_notify=datetime.now() + timedelta(hours=1),
            where_to_go="办公室",
            state="todo"
        )
        todo = create_todo(db=db, todo_in=todo_data, user_id=user_id)
        
        # 验证结果
        assert todo.title == todo_data.title
        assert todo.state == todo_data.state
        assert todo.user_id == user_id
        
        # 验证数据已保存到数据库
        db_todo = db.query(TodoItem).filter(TodoItem.id == todo.id).first()
        assert db_todo is not None
        assert db_todo.title == todo_data.title

    def test_get_todo(self, db: Session, todo_item: TodoItem):
        """测试获取单个待办事项功能"""
        result = get_todo(db=db, todo_id=todo_item.id)
        
        # 验证结果
        assert result is not None
        assert result.id == todo_item.id
        assert result.title == todo_item.title

    def test_get_todos_by_user(self, db: Session, user_id: str, todo_item: TodoItem):
        """测试获取用户所有待办事项功能"""
        # 再创建一个测试待办事项
        another_todo = TodoItem(
            id=str(uuid4()),
            title="另一个测试待办事项",
            timestamp=datetime.now(),
            state="doing",
            user_id=user_id
        )
        db.add(another_todo)
        db.commit()
        
        # 获取用户待办事项列表
        todos = get_todos_by_user(db=db, user_id=user_id)
        
        # 验证结果
        assert len(todos) == 2
        titles = [t.title for t in todos]
        assert todo_item.title in titles
        assert another_todo.title in titles

    def test_update_todo(self, db: Session, todo_item: TodoItem):
        """测试更新待办事项功能"""
        # 更新信息
        update_data = TodoItemUpdate(
            title="已更新的测试待办事项",
            state="doing"
        )
        
        # 执行更新
        updated_todo = update_todo(db=db, todo=todo_item, todo_in=update_data)
        
        # 验证结果
        assert updated_todo.title == update_data.title
        assert updated_todo.state == update_data.state
        assert updated_todo.id == todo_item.id  # ID不变
        
        # 验证数据库中的数据已更新
        db_todo = db.query(TodoItem).filter(TodoItem.id == todo_item.id).first()
        assert db_todo.title == update_data.title
        assert db_todo.state == update_data.state

    def test_delete_todo(self, db: Session, todo_item: TodoItem):
        """测试删除待办事项功能"""
        # 执行删除
        deleted_todo = delete_todo(db=db, todo_id=todo_item.id)
        
        # 验证返回了被删除的对象
        assert deleted_todo.id == todo_item.id
        
        # 验证数据库中已删除
        db_todo = db.query(TodoItem).filter(TodoItem.id == todo_item.id).first()
        assert db_todo is None 