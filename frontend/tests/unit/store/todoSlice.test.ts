import { configureStore } from '@reduxjs/toolkit';
import todoReducer, { 
  addTodo, 
  updateTodo, 
  deleteTodo, 
  setLoading, 
  setError,
  TodoItem
} from '../../../src/store/slices/todoSlice';

describe('Todo Slice 单元测试', () => {
  // 创建测试用的store
  const store = configureStore({
    reducer: {
      todo: todoReducer,
    },
  });

  // 测试数据
  const mockTodo: TodoItem = {
    id: '1',
    title: '测试待办事项',
    timestamp: new Date().toISOString(),
    state: 'todo',
  };

  const updatedTodo: TodoItem = {
    ...mockTodo,
    title: '已更新的待办事项',
    state: 'doing',
  };

  // 测试用例
  it('应该处理 addTodo action', () => {
    // 执行添加待办事项操作
    store.dispatch(addTodo(mockTodo));

    // 检查状态是否正确更新
    const state = store.getState().todo;
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockTodo);
  });

  it('应该处理 updateTodo action', () => {
    // 先添加一个待办事项
    store.dispatch(addTodo(mockTodo));
    
    // 然后更新它
    store.dispatch(updateTodo(updatedTodo));

    // 检查状态是否正确更新
    const state = store.getState().todo;
    expect(state.items).toHaveLength(1); // 数量不变
    expect(state.items[0]).toEqual(updatedTodo); // 内容已更新
  });

  it('应该处理 deleteTodo action', () => {
    // 先添加一个待办事项
    store.dispatch(addTodo(mockTodo));
    
    // 然后删除它
    store.dispatch(deleteTodo(mockTodo.id));

    // 检查状态是否正确更新
    const state = store.getState().todo;
    expect(state.items).toHaveLength(0); // 待办事项已删除
  });

  it('应该处理 setLoading action', () => {
    // 默认loading为false
    expect(store.getState().todo.loading).toBe(false);
    
    // 设置loading为true
    store.dispatch(setLoading(true));
    expect(store.getState().todo.loading).toBe(true);
    
    // 设置loading为false
    store.dispatch(setLoading(false));
    expect(store.getState().todo.loading).toBe(false);
  });

  it('应该处理 setError action', () => {
    // 默认error为null
    expect(store.getState().todo.error).toBeNull();
    
    // 设置error消息
    const errorMessage = '加载失败';
    store.dispatch(setError(errorMessage));
    expect(store.getState().todo.error).toBe(errorMessage);
    
    // 清除error
    store.dispatch(setError(null));
    expect(store.getState().todo.error).toBeNull();
  });
}); 