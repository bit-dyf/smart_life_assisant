## 一、用户对象与核心需求

在当今节奏日益加快的工作与学习环境中，初入职场的新人或刚步入大学校园的学生，常常面临繁杂的日程安排，容易手忙脚乱，导致事务分配不合理。同时，他们也可能因忙碌而忽视日常健康管理，因不熟悉环境而迷路，或因生活节奏过快而错过应有的仪式感。为此，本项目旨在面向这一群体，提供集代办清单管理、智能信息搜索、健康状态检测及个性化展示于一体的综合服务，助力用户更高效地管理生活事务，提升生活质量，从而在忙碌中也能保持节奏与从容。

## 二、功能需求

| **功能模块** | **功能描述**                                                 | **优先级** |
| ------------ | ------------------------------------------------------------ | ---------- |
| 用户系统     | 用户使用手机号注册登录，同时设置个人信息                     | P0         |
| 待办清单     | 通过用户输入待办事件的时间以及预估所需时间，形成一天的待办清单 | P0         |
| 智能搜索     | 搜索地点，获取并打开导航                                     | P1         |
| 健康监测     | 步数记录，喝水提醒                                           | P1         |
| 生活便签     | 支持记录文本以及图片、时间地点                               | P2         |

## 三、具体需求说明

1. ### **用户系统**

⚙️ **功能描述：**

- 支持手机号注册：通过发送短信验证码验证身份（调用腾讯云短信API接口：https://sms.tencentcloudapi.com/）
- 登录功能：通过手机号与密码登录，验证成功后进入个人用户界面
- 密码找回：通过手机号接收验证码，允许重设密码

✅ **界面描述：**

- **登录界面**
  - 输入框：用户账号、密码
  - 按钮：登录、注册（点击跳转到注册界面）、忘记密码（点击跳转到忘记密码界面）
  - 验证机制：若输入为空或格式内容错误，提示“请输入正确的账号/密码”
- **注册界面**
  - 输入框：手机号、验证码、密码、确认密码
  - 按钮：发送验证码、确认（点击返回登录界面）
  - 提示：验证码倒计时提示功能；密码不一致时提示错误信息
- **忘记密码界面**
  - 输入框：手机号、验证码、新密码、确认新密码
  - 按钮：发送验证码、提交修改（点击返回登录界面）

1. ### 首页

⚙️ 功能描述：

- 登录后进入该界面，提供待办清单、智能搜索、健康监测、生活便签四种功能选项，同时每个功能界面都设有左上角的返回按钮回到首页
- 用户信息设置：包括用户名、邮箱、密码、生日、定位字段（用于个性化服务）、退出登录按钮
- 系统在生日当天自动推送祝福通知

✅ 界面描述：

- **开始界面**：
  - 中间有待办清单、智能搜索、健康监测、生活便签四个按钮，右上角是个人设置按钮
- **个人设置界面**
  - 通用部分包括用户名（可修改）、邮箱（可修改）、密码（可修改）、生日（可修改）、定位（可修改）
  - 提示：若设置了生日，则系统将在生日当天发送节日祝福通知
  - 底部有退出登录按钮，点击询问是否退出，点击确定即回到登录界面

1. ### **待办清单**

⚙️ 功能描述：

- 支持添加每日待办事项，字段包括：标题、日期、开始时间、结束时间、地点、通知时间
- 默认展示当天（00:00~23:59）所有待办事项
- 支持通过日历选择查看指定日期的清单，包括已完成和待完成事项，也可以为指定日期添加待办事项
- 可以查看用户的每周、每月事项完成情况，包括进行中、未完成、已预期、已完成的事项数量
- 记录用户完成事项的信息，字段包括：完成时间、标题、地点

✅ 界面描述：

- **开始****界面**
  - 中间显示“+”号创建一条任务，点击跳转到创建任务界面
  - 两个按钮：
    - “取消”按钮：跳转到每日待办页面
    - “日历”按钮：跳转到菜单界面
- **每日待办界面**
  - 顶部显示菜单栏，点击跳转到菜单界面
  - 上部显示当前的日期、时间、地点、温度和天气信息
  - 中间区域是每日待办事项，包括开始时间、任务标题、地点信息，待办事项右侧是复选框，点击勾选则表示完成该事项
  - 右下角显示“+”号用于创建新任务，点击跳转到创建任务界面
- **日历界面**
  - 顶部显示菜单栏，点击跳转到菜单界面
  - 上部可通过点击选择或左右滚动切换日期
  - 中间区域是包括待完成和已完成两个按钮，点击切换界面，待完成界面包括待完成事项的标题、地点和结束时间；已完成界面包括完成事项的标题
- **创建****任务****界面**
  - 左上角显示返回按钮，点击返回每日待办界面/日历界面（取决于从哪个界面创建任务）
  - 上部有相册按钮，点击可以访问用户端的相册文件，给该任务插入图片，更美观简洁
  - 中部包括名称、时间、开始、结束、定位、通知输入框
  - 底部是确认按钮，点击保存待办事项并返回每日代办界面/日历界面（取决于从哪个界面创建任务）
- **月统计界面**
  - 顶部显示菜单栏，点击跳转到菜单界面
  - 上部是水平菜单栏，可以切换到每周、每月，同时显示具体的日期
  - 中间区域是进行中、未完成、已预期、已完成四个模块，每个模块用进度条显示，包括总事项和该模块事项的数字显示
- **个人统计界面**
  - 顶部显示菜单栏，点击跳转到菜单界面
  - 上部使用圆形进度条，显示进行中、未完成、已预期的进度和百分比信息
  - 中间区域可以切换时间，用时间线显示当天完成事项的时间、标题、地点信息
- **菜单界面**
  - 顶部显示“我的”字样
  - 中间区域包括首页（点击跳转到首页界面）、日历（点击跳转到日历界面）、概览（点击跳转到月统计界面）、我的（点击跳转到个人统计界面）按钮

1. ### **智能搜索**

⚙️ 功能描述：

- 集成多平台API，包括地图服务、新闻资讯、浏览器搜索
- 地图服务实现实时定位显示当前位置，智能路线规划支持驾车、公交、步行和骑行多种方式
- 浏览器搜索支持无痕浏览模式，保护隐私
- 新闻资讯实现个性化推荐算法，根据用户阅读习惯推送内容
- 历史搜索记录快速访问：创建本地数据库表（表结构包含：关键词、搜索时间字段）存储历史搜索记录，限制最大存储条数（如20条），每次成功搜索后保存记录（对本地数据库做增改查操作），支持长按历史记录项显示删除选项（对本地数据库做删操作）
- 支持关键词联想搜索：调用各平台的关键词联想API

✅ 界面描述：

**整体架构**

采用底部导航栏布局，默认进入地图导航界面，用户可通过底部导航栏在地图导航、浏览器和腾讯新闻三个主要功能模块之间切换。整体风格简洁现代，以用户体验为中心。

- **地图导航****界面****（默认首页）**
  - 顶部为搜索栏，包含输入框和搜索按钮，用户输入关键词搜索地点、路线（支持驾车、公交、步行和骑行多种方式）
  - 搜索栏下方为地图主视图，显示用户当前的位置，占据界面主要区域
  - 地图左下角有缩放控制按钮，方便用户调整地图比例
  - 底部导航栏高亮显示"地图"选项，表示当前页面
- **浏览器界面**
  - 顶部为导航控制栏，包含返回按钮（返回上一个界面）、搜索输入框和刷新按钮，还有无痕浏览按钮（点击可以开启/关闭无痕浏览）
  - 中间区域为网页显示区，占据界面主要空间
  - 底部导航栏高亮显示"浏览器"选项，表示当前页面
- **腾讯新闻界面**
  - 顶部为分类导航栏，可横向滑动切换不同新闻分类(推荐、热点、财经、体育等)
  - 中间为新闻列表区域，以卡片式布局展示新闻条目
  - 每个新闻卡片包含标题、摘要、配图、来源和发布时间信息
  - 底部导航栏高亮显示"新闻"选项，表示当前页面
- **底部导航栏**
  - 三个主要图标按钮：地图、浏览器、新闻
  - 当前选中的功能高亮显示

1. ### **健康监测**

⚙️ 功能描述：

- 步数统计：记录并显示今日步数（设定每15分钟更新一次）
- 周趋势图：展示最近7天的每日步数数据，以折线图的形式反映
- 喝水提醒：用户自定义时间点，系统在对应时间通过通知栏发送喝水提醒
- 支持多时间点提醒，保存至本地数据库

✅ 界面描述：

- **健康主页界面**
  - 今日步数模块：显示当前累计步数
  - 周步数趋势图：折线图形式，横轴为日期，纵轴为步数
  - 喝水提醒设置按钮：跳转到提醒时间设置界面
- **喝水提醒设置界面**
  - 时间选择器：可选择多个时间点（如 10:00、14:00、18:00）
  - 提交按钮：保存设置
  - 设置成功提示：“提醒设置成功，将通过通知栏提醒喝水”

1. ### **生活便签**

⚙️ 功能描述：

- 支持文本记录与图片记录，用户可选择任意方式添加生活便签
- 每条记录自动打上时间戳和地点信息
- 支持历史便签查询，按日期归档管理
- 图文内容本地存储

✅ 界面描述：

- **便签首页界面**
  - 今日记录内容区域：图文列表，展示今日记录的所有便签
  - 两个按钮：
    - “添加”按钮：跳转添加界面（拍照或文本）
    - “查看”按钮：跳转日历界面，选择某一天查看便签
- **添加便签界面**
  - 拍照功能（调用系统相机）或输入文本框（二选一或组合）
  - 记录自动带入当前时间
  - 保存后返回首页并更新展示
- **历史便签查看界面**
  - 日历形式选择日期，展示所选日期的便签记录（按时间倒序）