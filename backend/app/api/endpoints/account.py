from fastapi import APIRouter, Depends, HTTPException

router = APIRouter()


@router.get("/me")
async def get_current_user_info():
    """
    获取当前登录用户信息
    """
    return {"message": "此功能尚未实现，仅用于演示"}


@router.post("/login")
async def login():
    """
    用户登录
    """
    return {"message": "此功能尚未实现，仅用于演示"}


@router.post("/register")
async def register():
    """
    用户注册
    """
    return {"message": "此功能尚未实现，仅用于演示"} 