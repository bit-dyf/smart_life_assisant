import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 用户类型定义
export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
}

// 状态类型定义
interface AccountState {
  currentUser: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// 初始状态
const initialState: AccountState = {
  currentUser: null,
  token: null,
  loading: false,
  error: null,
};

// 创建账户切片
const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    // 设置当前用户
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    // 设置认证令牌
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    // 设置加载状态
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // 设置错误信息
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // 退出登录
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
});

// 导出actions
export const { setCurrentUser, setToken, setLoading, setError, logout } = accountSlice.actions;

export default accountSlice.reducer; 