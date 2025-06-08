from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
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
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 包含所有API路由
app.include_router(api_router, prefix="/api")

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

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    ) 