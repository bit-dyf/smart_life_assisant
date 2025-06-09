import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 便签图片类型定义
export interface NoteImage {
  id: string;
  url: string;
  createdAt: string;
}

// 便签类型定义
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  images: NoteImage[];
  isPinned: boolean;
  colorCode?: string;
}

// 状态类型定义
interface NoteState {
  notes: Note[];
  selectedNote: Note | null;
  loading: boolean;
  error: string | null;
}

// 初始状态
const initialState: NoteState = {
  notes: [],
  selectedNote: null,
  loading: false,
  error: null,
};

// 创建便签切片
const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    // 设置便签列表
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    // 添加便签
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload);
    },
    // 更新便签
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    // 删除便签
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    // 设置选中的便签
    setSelectedNote: (state, action: PayloadAction<Note | null>) => {
      state.selectedNote = action.payload;
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
  setNotes,
  addNote,
  updateNote,
  deleteNote,
  setSelectedNote,
  setLoading,
  setError,
} = noteSlice.actions;

export default noteSlice.reducer; 