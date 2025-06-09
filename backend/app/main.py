from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 初始化数据库
from app.db.init_db import create_tables
from app.core.config import settings

# 创建FastAPI应用实例
app = FastAPI(
    title="智能生活助手 API",
    description="智能生活助手应用的后端API服务",
    version="0.1.0",
)

# 设置CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 简化：允许所有源
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 健康检查端点
@app.get("/health", tags=["health"])
async def health_check():
    """
    健康检查端点
    
    返回应用程序的基本状态信息
    """
    return {
        "status": "healthy",
        "version": "0.1.0",
    }

# 简化的API端点，临时替代完整路由
@app.get("/api/todo", tags=["todo"])
async def get_todos():
    return {
        "todos": [
            {"id": "1", "title": "完成应用开发", "state": "doing"},
            {"id": "2", "title": "编写测试用例", "state": "todo"},
        ]
    }

@app.get("/api/account/me", tags=["account"])
async def get_current_user():
    return {
        "id": "temp-user-id",
        "email": "test@example.com",
        "username": "测试用户",
    }

# 创建数据库表
try:
    create_tables()
except Exception as e:
    print(f"数据库初始化错误（仅用于开发）: {e}")

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    ) 