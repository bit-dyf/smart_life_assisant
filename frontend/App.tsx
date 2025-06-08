import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// 导入主导航（实际实现将在navigation文件夹中）
import MainNavigator from './src/navigation/MainNavigator';
// 导入Redux存储（实际实现将在store文件夹中）
import store from './src/store';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <MainNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ReduxProvider>
  );
} 