from fastapi import APIRouter, Depends

router = APIRouter()


@router.get("/")
async def get_notes():
    """
    获取便签列表
    """
    return {"message": "此功能尚未实现，仅用于演示"}


@router.post("/")
async def create_note():
    """
    创建新便签
    """
    return {"message": "此功能尚未实现，仅用于演示"}


@router.get("/{note_id}")
async def get_note(note_id: str):
    """
    获取指定便签
    """
    return {"note_id": note_id, "message": "此功能尚未实现，仅用于演示"} 