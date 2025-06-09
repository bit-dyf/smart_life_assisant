import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 搜索记录类型定义
export interface SearchRecord {
  id: string;
  keyword: string;
  timestamp: string;
}

// 推荐内容类型定义
export interface RecommendedContent {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
}

// 状态类型定义
interface SearchState {
  history: SearchRecord[];
  recommendedContent: RecommendedContent[];
  currentResults: any[];
  tracelessMode: boolean;
  loading: boolean;
  error: string | null;
}

// 初始状态
const initialState: SearchState = {
  history: [],
  recommendedContent: [],
  currentResults: [],
  tracelessMode: false,
  loading: false,
  error: null,
};

// 创建搜索切片
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // 设置搜索历史
    setHistory: (state, action: PayloadAction<SearchRecord[]>) => {
      state.history = action.payload;
    },
    // 添加搜索记录
    addSearchRecord: (state, action: PayloadAction<SearchRecord>) => {
      if (!state.tracelessMode) {
        state.history.unshift(action.payload);
      }
    },
    // 设置推荐内容
    setRecommendedContent: (state, action: PayloadAction<RecommendedContent[]>) => {
      state.recommendedContent = action.payload;
    },
    // 设置搜索结果
    setSearchResults: (state, action: PayloadAction<any[]>) => {
      state.currentResults = action.payload;
    },
    // 设置无痕模式
    setTracelessMode: (state, action: PayloadAction<boolean>) => {
      state.tracelessMode = action.payload;
    },
    // 清空搜索历史
    clearHistory: (state) => {
      state.history = [];
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
export const {
  setHistory,
  addSearchRecord,
  setRecommendedContent,
  setSearchResults,
  setTracelessMode,
  clearHistory,
  setLoading,
  setError,
} = searchSlice.actions;

export default searchSlice.reducer; 