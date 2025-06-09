import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

// 临时的健康监测页面组件
const HealthScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>健康监测</Text>
  </View>
);

const HealthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="健康" component={HealthScreen} />
    </Stack.Navigator>
  );
};

export default HealthNavigator; 