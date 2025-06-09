from fastapi import APIRouter

router = APIRouter()


@router.get("/status")
async def health_status():
    """
    获取应用健康状态
    """
    return {
        "status": "ok",
        "details": {
            "database": "connected",
            "services": "running"
        }
    } 