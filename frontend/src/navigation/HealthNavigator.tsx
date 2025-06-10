import React, { useState } from 'react';
import {
  createStackNavigator
} from '@react-navigation/stack';
import {
  Text, View, Image, StyleSheet, TouchableOpacity
} from 'react-native';

const Stack = createStackNavigator();

const stepImage = require('../../img/steps.png');
const waterImage = require('../../img/water.png');

const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const HealthScreen = () => {
  const [selectedDay, setSelectedDay] = useState('周一');

  return (
    <View style={{ flex: 1 }}>
      {/* 步数模块 */}
      <View style={styles.card1}>
        <Image source={stepImage} style={styles.image} resizeMode="cover" />
        <View style={styles.textContainer}>
          <Text style={styles.text}>今日步数: XXX</Text>
        </View>
      </View>

      {/* 喝水模块 */}
      <View style={styles.card2}>
        <Image source={waterImage} style={styles.image} resizeMode="cover" />
        <View style={styles.textContainer}>
          <Text style={styles.text}>今日喝水: XXX 次</Text>
        </View>
      </View>

      {/* 日期选择条 */}
      <View style={styles.dateBar}>
        {days.map((day) => (
          <TouchableOpacity key={day} onPress={() => setSelectedDay(day)}>
            <View
              style={[
                styles.dateItem,
                selectedDay === day && styles.selectedDateItem
              ]}
            >
              <Text
                style={[
                  styles.dateText,
                  selectedDay === day && styles.selectedDateText
                ]}
              >
                {day}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const HealthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="健康" component={HealthScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  card1: {
    position: 'absolute',
    top: 30,
    left: 10,
    width: 180,
    height: 220,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  card2: {
    position: 'absolute',
    top: 30,
    left: 200,
    width: 180,
    height: 220,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 170,
  },
  textContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateBar: {
    position: 'absolute',
    top: 270,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 2,
  },
  dateItem: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  selectedDateItem: {
    backgroundColor: '#4CAF50',
  },
  dateText: {
    color: '#333',
    fontSize: 14,
  },
  selectedDateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HealthNavigator;