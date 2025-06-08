# 智能生活助手应用

<div align="center">

![版本](https://img.shields.io/badge/版本-0.1.0-blue)
![许可证](https://img.shields.io/badge/许可证-MIT-green)
![React Native](https://img.shields.io/badge/React%20Native-0.72.4-61dafb)
![FastAPI](https://img.shields.io/badge/FastAPI-0.103.1-009688)

</div>

智能生活助手是一款集**待办清单**、**智能搜索**、**健康监测**和**生活便签**等功能于一体的移动应用，旨在帮助用户高效管理日常生活和工作。

## 📱 功能介绍

- **待办清单**：创建、管理和追踪日常任务，支持设置提醒、截止日期等
- **智能搜索**：根据用户兴趣和历史行为提供个性化信息推荐，支持无痕搜索模式
- **健康监测**：记录步数、设置喝水提醒，帮助用户养成健康习惯
- **生活便签**：快速记录想法和灵感，支持文本和图片混合内容

## 🛠️ 技术栈

- **前端**：React Native、TypeScript、Redux、Expo
- **后端**：Python、FastAPI、SQLAlchemy
- **数据库**：PostgreSQL
- **测试**：Jest、React Native Testing Library、Pytest、Detox

## 🚀 快速开始

### 前端环境配置

确保已安装Node.js (v16+)和Expo CLI

```bash
# 安装依赖
cd frontend
npm install

# 启动应用
npm start
```

### 后端环境配置

需要Python 3.9+环境

```bash
# 创建并激活虚拟环境
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 安装依赖 `backend\requirements.txt`
cd backend
pip install -r requirements.txt

# 启动服务器
uvicorn app.main:app --reload
```

## 📁 目录结构

```
智能生活助手/
├── frontend/            # 前端React Native代码
│   ├── src/             # 源代码
│   └── tests/           # 前端测试
├── backend/             # 后端FastAPI代码
│   ├── app/             # 应用代码
│   └── tests/           # 后端测试
├── docs/                # 项目文档
└── tests/               # 端到端测试
```

## 📚 文档

- **开发指南**：请参考[开发环境设置](./docs/development-guide.md)
- **API文档**：启动后端服务后访问 `http://localhost:8000/docs`
- **测试策略**：详见[测试策略文档](./docs/testing-strategy.md)
- **功能模块文档**：
  - [账户服务](./docs/modules/account-service.md)
  - [待办事项服务](./docs/modules/todo-service.md)
  - [智能搜索服务](./docs/modules/search-service.md)
  - [健康监测服务](./docs/modules/health-service.md)
  - [生活便签服务](./docs/modules/note-service.md)
  - [通知服务](./docs/modules/notification-service.md)
  - [存储服务](./docs/modules/storage-service.md)

## 🧪 测试

本项目采用多层次测试策略，覆盖单元测试、集成测试和端到端测试。

```bash
# 运行前端测试
cd frontend
npm test

# 运行后端测试
cd backend
pytest
```

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出新功能建议！

1. Fork本仓库
2. 创建你的特性分支（`git checkout -b feature/amazing-feature`）
3. 提交你的更改（`git commit -m 'Add some amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 打开一个Pull Request

请确保遵循我们的[代码规范](./CODE_SPECIFICATION.md)。

## 📝 许可证

本项目采用MIT许可证 - 详情请参见[LICENSE](./LICENSE)文件

## 👥 作者与致谢

- **开发团队** - [项目团队成员]

特别感谢所有为本项目做出贡献的开发者和测试者！ 