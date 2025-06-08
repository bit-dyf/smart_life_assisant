import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slices/accountSlice';
import todoReducer from './slices/todoSlice';
import searchReducer from './slices/searchSlice';
import healthReducer from './slices/healthSlice';
import noteReducer from './slices/noteSlice';

// 配置Redux存储，整合所有功能模块的Reducer
const store = configureStore({
  reducer: {
    account: accountReducer,
    todo: todoReducer,
    search: searchReducer,
    health: healthReducer,
    note: noteReducer,
  },
});

// 导出RootState和AppDispatch类型，用于TypeScript类型推断
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 