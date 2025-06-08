from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """应用程序设置类，管理所有配置项"""
    
    # 基本设置
    PROJECT_NAME: str = "智能生活助手"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = "your-secret-key-here"  # 在生产环境中应使用环境变量
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 天
    
    # 数据库设置
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "smart_life_assistant"
    SQLALCHEMY_DATABASE_URI: Union[str, None] = None

    @field_validator("SQLALCHEMY_DATABASE_URI", mode="before")
    def assemble_db_connection(cls, v: Union[str, None], values: dict) -> str:
        if isinstance(v, str):
            return v
        
        return f"postgresql://{values['POSTGRES_USER']}:{values['POSTGRES_PASSWORD']}@{values['POSTGRES_SERVER']}/{values['POSTGRES_DB']}"
    
    # CORS设置
    CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",  # 前端开发服务器
        "http://localhost:8081",  # Expo开发服务器
    ]

    # 使用.env文件配置
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)


# 创建全局设置实例
settings = Settings() 