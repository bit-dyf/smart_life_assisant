import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 创建axios实例，配置基本URL和超时时间
const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 请求拦截器：添加认证token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：处理常见错误
api.interceptors.response.use(
  (response) => {
    // 只返回响应数据部分
    return response.data;
  },
  (error) => {
    // 处理错误状态
    if (error.response) {
      // 401状态：未授权，清除token并重定向到登录
      if (error.response.status === 401) {
        AsyncStorage.removeItem('token');
        // 重定向逻辑在实际应用中实现
      }
    }
    return Promise.reject(error);
  }
);

export default api; 