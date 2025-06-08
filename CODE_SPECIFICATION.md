# **智能生活助手项目代码规范文档**

版本: 1.0.0

日期: 2025年6月8日

## 1. 引言

### 1.1. 文档目的

本规范文档旨在为【智能生活助手】项目的开发提供一套统一的编码、提交和协作标准。其主要目的在于：

- **提升代码可读性与可维护性：** 统一的风格使代码更容易被理解和修改。
- **提高团队协作效率：** 减少因个人编码习惯差异带来的沟通成本和冲突。
- **保障项目代码质量：** 通过自动化工具规避常见错误，确保代码的健壮性。
- **促进专业习惯养成：** 遵循行业最佳实践，共同学习和进步。

### 1.2. 核心原则

1. **遵循行业标准，不另造轮子：** 优先采用社区广泛认可的最佳实践（如PEP 8, Airbnb Style Guide）。
2. **自动化强制，而非人为记忆：** 借助Linter、Formatter和Git Hooks等工具，将规范融入开发流程，实现自动检查与修复。

### 1.3. 适用范围

本规范适用于本项目所有代码，技术栈包括但不限于：

- **前端:** React Native, TypeScript/JavaScript
- **后端:** Python 3.11, FastAPI
- **数据库:** PostgreSQL

------

## 2. 通用规范

### 2.1. 命名规范

清晰的命名是代码自解释能力的基础。

| **元素**               | **命名法**                    | **示例**                                              |
| ---------------------- | ----------------------------- | ----------------------------------------------------- |
| **变量/函数** (JS)     | 小驼峰 (camelCase)            | `userName`, `calculateTotal()`                        |
| **变量/函数** (Python) | 蛇形 (snake_case)             | `user_name`, `calculate_total()`                      |
| **类/React组件**       | 大驼峰/帕斯卡 (PascalCase)    | `class UserProfile:`, `function UserProfileCard() {}` |
| **常量**               | 全大写蛇形 (UPPER_SNAKE_CASE) | `const API_URL = "..."`, `MAX_RETRIES = 3`            |
| **文件名** (JS组件)    | 大驼峰 (PascalCase)           | `UserProfileCard.tsx`                                 |
| **文件名** (其他)      | 小驼峰或蛇形                  | `utils.js`, `db_utils.py`                             |

### 2.2. 注释规范

注释的目的是解释代码"为什么"这么做，而不是"做了什么"。

- **单行注释：** 用于解释局部或复杂的单行代码。

- **块级注释：** 用于描述复杂的业务逻辑、算法或临时解决方案。

- 文档化注释：

   必须为公共函数、类和模块编写，解释其用途、参数和返回值。

  - **Python:** 使用 [Google风格Docstrings](https://www.google.com/search?q=https://google.github.io/styleguide/pyguide.html%233.8-comments-and-docstrings)。
  - **JavaScript/TypeScript:** 使用 [JSDoc](https://jsdoc.app/) 规范。

### 2.3. Git 提交规范

所有Git提交信息必须遵循 **[Conventional Commits](https://www.conventionalcommits.org/)** 规范。

- **格式：** `<type>(<scope>): <subject>`
- 常用 `type`:
  - `feat`: 新增功能
  - `fix`: 修复Bug
  - `docs`: 文档变更
  - `style`: 代码格式调整
  - `refactor`: 代码重构
  - `test`: 测试相关
  - `chore`: 构建过程或辅助工具的变动
- **示例:** `feat(api): add user registration endpoint`

------

## 3. 前端规范 (React Native)

### 3.1. 语言与风格

- **语言:** 优先使用 **TypeScript** 以获得类型安全。
- **风格指南:** 遵循 **[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)** 作为基础。

### 3.2. 核心工具

- **代码格式化:** 使用 **Prettier**。
- **代码检查:** 使用 **ESLint**，并集成`eslint-config-airbnb`, `eslint-plugin-react`, `eslint-plugin-react-native`, `@typescript-eslint/eslint-plugin`等插件。

### 3.3. 组件开发

- **单一职责:** 每个组件应只关注一件事情。
- **目录结构:** 功能相关的组件、Hooks和工具函数应组织在同一个目录下。
- **合理拆分:** 当一个组件变得过于庞大和复杂时，应将其拆分为更小的、可复用的子组件。

------

## 4. 后端规范 (FastAPI)

### 4.1. 语言与风格

- **语言:** 使用 Python 3.9 或更高版本。
- **风格指南:** 严格遵守 **[PEP 8](https://www.python.org/dev/peps/pep-0008/)**。

### 4.2. 核心工具

- **代码格式化:** 使用 **Black**。
- **代码检查与排序:** 使用 **Ruff**。
- **类型检查:** 使用 **Mypy** 强制执行类型注解。

### 4.3. API 设计

- **风格:** 遵循 **RESTful** 设计原则。

- **路径:** 使用小写蛇形命名法，名词用复数。例如：`/users`, `/todo_items`。

- **统一响应格式:** 所有API响应都应包装在统一的JSON结构中。

  JSON

  ```
  // 成功响应
  {
    "code": 0,
    "message": "Success",
    "data": {
      "user_id": 123,
      "user_name": "example"
    }
  }
  
  // 失败响应
  {
    "code": 40401, // 自定义业务错误码
    "message": "User not found",
    "data": null
  }
  ```

### 4.4. 依赖管理

- 使用 `pip` 配合 `requirements.txt` 文件管理项目依赖。

------

## 5. 数据库规范 (PostgreSQL)

### 5.1. 命名规范

- **表名 (Tables):** 使用小写蛇形命名法，且为名词复数。例如：`users`, `todo_items`。
- **字段名 (Columns):** 使用小写蛇形命名法。例如：`id`, `user_name`, `created_at`。
- **主键 (Primary Key):** 统一使用 `id` 作为主键。
- **外键 (Foreign Key):** 使用 `<关联表单数名>_id` 的格式。例如：在 `todo_items` 表中关联 `users` 表的外键为 `user_id`。

### 5.2. 设计原则

- 所有表必须有主键。
- 优先使用 `TIMESTAMP WITH TIME ZONE` (`timestamptz`) 存储时间，以避免时区问题。
- 为重要的字段和表添加注释说明（`COMMENT ON ...`）。

------

## 6. 自动化与执行

规范的生命力在于执行。所有规范应通过工具自动化。

### 6.1. IDE 配置

- **强烈建议：** 在 **VS Code** 中启用 **Format on Save** 功能。IDE将根据项目配置的 Prettier 和 Black 自动格式化代码。

### 6.2. Git Hooks

- 通过代码提交前的钩子，强制执行代码检查和格式化，不符合规范的代码将被禁止提交。
- **前端:** 使用 **Husky** + **lint-staged**。
- **后端:** 使用 **pre-commit** 框架。

------

## 7. 附录

### 7.1. 推荐工具列表

- **代码编辑器/IDE:** cursor
- **数据库客户端:**  Navicat
- **API 测试工具:** Postman 或 Insomnia

### 7.2. 配置文件示例

项目根目录下应包含以下核心配置文件，以驱动自动化工具：

- `.prettierrc`
- `.editorconfig`
- `.eslintrc.js`
- `tsconfig.json`
- `pyproject.toml` (用于配置Ruff, Black, Mypy)
- `.pre-commit-config.yaml`

------