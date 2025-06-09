import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

// 临时的生活便签页面组件
const NoteScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>生活便签</Text>
  </View>
);

const NoteNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="便签" component={NoteScreen} />
    </Stack.Navigator>
  );
};

export default NoteNavigator; 