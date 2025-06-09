import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 步数记录类型定义
export interface StepRecord {
  id: string;
  date: string;
  steps: number;
  source: string;
}

// 喝水提醒类型
export interface WaterReminder {
  enabled: boolean;
  times: string[];
  targetVolume: number; // 单位ml
}

// 健康设置类型
export interface HealthSettings {
  dailyStepGoal: number;
  waterReminders: WaterReminder;
}

// 状态类型定义
interface HealthState {
  stepRecords: StepRecord[];
  settings: HealthSettings;
  loading: boolean;
  error: string | null;
}

// 初始状态
const initialState: HealthState = {
  stepRecords: [],
  settings: {
    dailyStepGoal: 10000,
    waterReminders: {
      enabled: false,
      times: [],
      targetVolume: 2000,
    },
  },
  loading: false,
  error: null,
};

// 创建健康切片
const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    // 设置步数记录
    setStepRecords: (state, action: PayloadAction<StepRecord[]>) => {
      state.stepRecords = action.payload;
    },
    // 添加步数记录
    addStepRecord: (state, action: PayloadAction<StepRecord>) => {
      state.stepRecords.push(action.payload);
    },
    // 更新健康设置
    updateHealthSettings: (state, action: PayloadAction<Partial<HealthSettings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    // 更新喝水提醒设置
    updateWaterReminders: (state, action: PayloadAction<Partial<WaterReminder>>) => {
      state.settings.waterReminders = { ...state.settings.waterReminders, ...action.payload };
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
  setStepRecords,
  addStepRecord,
  updateHealthSettings,
  updateWaterReminders,
  setLoading,
  setError,
} = healthSlice.actions;

export default healthSlice.reducer; 