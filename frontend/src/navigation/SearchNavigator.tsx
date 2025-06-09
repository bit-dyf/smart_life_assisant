import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

// 临时的智能搜索页面组件
const SearchScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>智能搜索</Text>
  </View>
);

const SearchNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="搜索" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default SearchNavigator; 