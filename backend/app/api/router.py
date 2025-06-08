from fastapi import APIRouter

from app.api.endpoints import account, todo, search, health, note

# 创建主API路由器
api_router = APIRouter()

# 添加各模块的路由
api_router.include_router(account.router, prefix="/account", tags=["account"])
api_router.include_router(todo.router, prefix="/todo", tags=["todo"])
api_router.include_router(search.router, prefix="/search", tags=["search"])
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(note.router, prefix="/note", tags=["note"]) 