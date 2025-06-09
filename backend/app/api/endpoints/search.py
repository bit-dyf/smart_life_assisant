from fastapi import APIRouter, Depends, Query

router = APIRouter()


@router.get("/")
async def search(q: str = Query(..., description="搜索关键词")):
    """
    全局搜索功能
    """
    return {"results": [f"搜索结果示例: {q}"], "query": q} 