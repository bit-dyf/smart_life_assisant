import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

// 临时的账户页面组件
const AccountScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>个人中心页面</Text>
  </View>
);

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="账户" component={AccountScreen} />
    </Stack.Navigator>
  );
};

export default AccountNavigator; 