import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

// 临时的待办事项页面组件
const TodoListScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>待办事项列表</Text>
  </View>
);

const TodoNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="待办列表" component={TodoListScreen} />
    </Stack.Navigator>
  );
};

export default TodoNavigator; 