# 功能单元规格说明

## 基本信息
- **单元名称**：通知服务
- **路径**：backend/app/services/notification_service.py
- **类型**：API服务

## 功能描述
提供应用内通知和推送通知的核心业务逻辑，包括通知的创建、发送、查询和管理。该服务是通知系统的核心服务层，负责处理各类通知的分发和管理，支持待办提醒、健康提示和系统消息等多种通知类型。

## 接口规范
### 输入
- **创建通知**:
  - `db`: SQLAlchemy Session - 数据库会话
  - `user_id`: str - 接收通知的用户ID
  - `title`: str - 通知标题
  - `content`: str - 通知内容
  - `type`: NotificationType - 通知类型（待办提醒/健康提示/系统消息等）
  - `related_id`: str (可选) - 关联的对象ID（如待办事项ID）
  - `scheduled_time`: datetime (可选) - 计划发送时间
  
- **发送推送通知**:
  - `user_id`: str - 接收通知的用户ID
  - `title`: str - 通知标题
  - `body`: str - 通知内容
  - `data`: Dict (可选) - 附加数据
  
- **获取用户通知列表**:
  - `db`: SQLAlchemy Session - 数据库会话
  - `user_id`: str - 用户ID
  - `skip`: int (可选) - 分页起始位置，默认0
  - `limit`: int (可选) - 分页大小，默认20
  - `unread_only`: bool (可选) - 是否只返回未读通知，默认False
  
- **标记通知为已读**:
  - `db`: SQLAlchemy Session - 数据库会话
  - `notification_id`: str - 通知ID
  - `user_id`: str - 用户ID
  
- **标记所有通知为已读**:
  - `db`: SQLAlchemy Session - 数据库会话
  - `user_id`: str - 用户ID
  
- **删除通知**:
  - `db`: SQLAlchemy Session - 数据库会话
  - `notification_id`: str - 通知ID
  - `user_id`: str - 用户ID

### 输出
- **创建通知**: Notification - 创建的通知数据库模型
- **发送推送通知**: bool - 发送是否成功
- **获取用户通知列表**: List[Notification] - 通知数据库模型列表
- **标记通知为已读**: Notification - 更新后的通知数据库模型
- **标记所有通知为已读**: int - 已更新的通知数量
- **删除通知**: bool - 删除是否成功

## 依赖关系
- **数据库模型层**: 依赖app.models.notification.Notification模型
- **数据校验层**: 依赖app.schemas.notification中的Pydantic模型
- **推送服务**: 依赖Firebase Cloud Messaging或其他推送服务发送设备通知
- **设备管理**: 依赖app.services.device_service获取用户设备信息
- **任务队列**: 依赖后台任务系统处理异步通知发送

## 副作用
- **数据库操作**: 向数据库添加新的通知记录
- **推送操作**: 向用户设备发送推送通知
- **状态更新**: 更新通知的已读状态
- **定时任务**: 创建定时任务以在指定时间发送通知

## 异常处理
- **推送失败**: 处理推送服务不可用或设备令牌无效的情况
- **权限验证**: 确保用户只能访问自己的通知
- **重复通知**: 避免在短时间内发送重复内容的通知
- **通知限流**: 防止过多通知在短时间内发送给同一用户

## 注意事项
- **电池优化**: 合理设计通知策略，避免过度打扰用户和消耗设备电量
- **多平台支持**: 确保通知系统支持iOS和Android等不同平台
- **用户体验**: 提供通知偏好设置，允许用户控制接收的通知类型
- **本地化**: 支持通知内容的多语言本地化
- **离线处理**: 处理用户设备离线时的通知积压和重试策略 