// 使用Detox进行React Native端到端测试
// Detox是React Native专用的测试框架，用于执行真实的端到端测试

describe('待办事项功能流程测试', () => {
  beforeAll(async () => {
    // 测试前的准备工作
    await device.launchApp();
    // 登录系统
    await loginToApp('testuser@example.com', 'password123');
  });

  beforeEach(async () => {
    // 每个测试前都回到待办清单主页
    await navigateToTodoList();
  });

  it('应该能够创建新的待办事项', async () => {
    // 点击添加按钮
    await element(by.id('add-todo-button')).tap();
    
    // 填写待办事项信息
    await element(by.id('todo-title-input')).typeText('购买日用品');
    await element(by.id('todo-location-input')).typeText('超市');
    await element(by.id('todo-state-selector')).tap();
    await element(by.text('待办')).tap();
    
    // 保存待办事项
    await element(by.id('save-todo-button')).tap();
    
    // 验证待办事项是否已添加
    await expect(element(by.text('购买日用品'))).toBeVisible();
    await expect(element(by.text('超市'))).toBeVisible();
  });

  it('应该能够更新待办事项的状态', async () => {
    // 找到刚才创建的待办事项
    await element(by.text('购买日用品')).tap();
    
    // 修改状态为"进行中"
    await element(by.id('todo-state-selector')).tap();
    await element(by.text('进行中')).tap();
    
    // 保存修改
    await element(by.id('save-todo-button')).tap();
    
    // 验证状态已更新
    await expect(element(by.text('进行中'))).toBeVisible();
  });

  it('应该能够删除待办事项', async () => {
    // 找到刚才创建的待办事项并长按
    await element(by.text('购买日用品')).longPress();
    
    // 点击删除按钮
    await element(by.id('delete-todo-button')).tap();
    
    // 确认删除
    await element(by.text('确认')).tap();
    
    // 验证待办事项已删除
    await expect(element(by.text('购买日用品'))).not.toBeVisible();
  });
});

// 辅助函数
async function loginToApp(email, password) {
  await element(by.id('email-input')).typeText(email);
  await element(by.id('password-input')).typeText(password);
  await element(by.id('login-button')).tap();
  // 等待登录完成
  await waitFor(element(by.id('main-tab-bar'))).toBeVisible().withTimeout(5000);
}

async function navigateToTodoList() {
  // 点击底部导航栏中的"待办清单"
  await element(by.text('待办清单')).atIndex(0).tap();
  // 等待待办清单页面加载
  await waitFor(element(by.id('todo-list-screen'))).toBeVisible().withTimeout(2000);
} 