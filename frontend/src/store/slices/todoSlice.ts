import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 待办事项类型定义
export interface TodoItem {
  id: string;
  title: string;
  timeBegin?: string;
  timeEnd?: string;
  timestamp: string;
  timeNotify?: string;
  whereToGo?: string;
  state: 'doing' | 'todo' | 'done' | 'pending'; // 对应：正在做/没做/已做完/没到做的时间
}

// 状态类型定义
interface TodoState {
  items: TodoItem[];
  loading: boolean;
  error: string | null;
}

// 初始状态
const initialState: TodoState = {
  items: [],
  loading: false,
  error: null,
};

// 创建Todo切片
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // 添加待办事项
    addTodo: (state, action: PayloadAction<TodoItem>) => {
      state.items.push(action.payload);
    },
    // 更新待办事项
    updateTodo: (state, action: PayloadAction<TodoItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    // 删除待办事项
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // 设置加载状态
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // 设置错误信息
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// 导出actions
export const { addTodo, updateTodo, deleteTodo, setLoading, setError } = todoSlice.actions;

export default todoSlice.reducer; 