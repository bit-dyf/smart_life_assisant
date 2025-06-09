import uvicorn
from app.db.init_db import create_tables

if __name__ == "__main__":
    # 创建数据库表
    create_tables()
    
    # 启动服务
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    ) 