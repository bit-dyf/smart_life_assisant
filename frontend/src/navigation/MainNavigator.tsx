import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 导入各模块的导航栏
import AccountNavigator from './AccountNavigator';
import TodoNavigator from './TodoNavigator';
import SearchNavigator from './SearchNavigator';
import HealthNavigator from './HealthNavigator';
import NoteNavigator from './NoteNavigator';

// 实际实现将替换为真实的组件
const Tab = createBottomTabNavigator();

/**
 * 主导航组件
 * 
 * 提供应用的底部标签导航功能，整合所有主要功能模块
 */
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="待办清单" component={TodoNavigator} />
      <Tab.Screen name="智能搜索" component={SearchNavigator} />
      <Tab.Screen name="健康监测" component={HealthNavigator} />
      <Tab.Screen name="生活便签" component={NoteNavigator} />
      <Tab.Screen name="个人中心" component={AccountNavigator} />
    </Tab.Navigator>
  );
};

export default MainNavigator; 