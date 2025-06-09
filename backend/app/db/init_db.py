from sqlalchemy.orm import Session

from app import models
from app.db.base_class import Base
from app.db.session import engine


def init_db(db: Session) -> None:
    """
    初始化数据库
    
    创建所有表并添加初始数据
    """
    # 创建所有表
    Base.metadata.create_all(bind=engine)
    
    # 这里可以添加初始数据
    # 例如创建管理员用户等


def create_tables() -> None:
    """
    创建所有表
    """
    Base.metadata.create_all(bind=engine) 