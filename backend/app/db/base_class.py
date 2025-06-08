from typing import Any
from sqlalchemy.ext.declarative import as_declarative, declared_attr


@as_declarative()
class Base:
    """
    SQLAlchemy模型的基类
    
    提供了自动表名生成和其他通用方法
    """
    
    # 使所有类都具有id属性，但实际上由子类定义
    id: Any
    
    # 生成表名
    @declared_attr
    def __tablename__(cls) -> str:
        """
        将类名转换为小写蛇形命名，作为表名
        
        例如: UserProfile -> user_profile
        """
        return cls.__name__.lower() 