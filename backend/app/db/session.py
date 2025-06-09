from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

# 创建SQLAlchemy引擎
# 在实际环境中使用settings中的数据库URI
# 这里使用SQLite内存数据库作为临时解决方案，便于启动服务
engine = create_engine("sqlite:///./test.db", connect_args={"check_same_thread": False})

# 创建会话工厂
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) 