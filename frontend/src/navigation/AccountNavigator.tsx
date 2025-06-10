import React, { useState } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AccountScreen = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    username: '默认用户名',
    email: 'user@example.com',
    password: '',
    birthday: '1990-01-01',
    location: '北京市'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({...formData, [field]: value});
  };

  const handleSave = () => {
    console.log('保存数据:', formData);
    // 这里可以添加保存数据的逻辑
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* 选项卡容器 */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'general' && styles.activeTab]}
            onPress={() => setActiveTab('general')}
          >
            <Text style={[styles.tabText, activeTab === 'general' && styles.activeTabText]}>通用</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'notification' && styles.activeTab]}
            onPress={() => setActiveTab('notification')}
          >
            <Text style={[styles.tabText, activeTab === 'notification' && styles.activeTabText]}>通知</Text>
          </TouchableOpacity>
        </View>

        {/* 通用选项卡内容 */}
        {activeTab === 'general' && (
          <View style={styles.formContainer}>
            {/* 用户名 */}
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>用户名</Text>
              <TextInput
                style={styles.inputField}
                value={formData.username}
                onChangeText={(text) => handleInputChange('username', text)}
                placeholder="请输入用户名"
              />
            </View>

            {/* 邮箱 */}
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>邮箱</Text>
              <TextInput
                style={styles.inputField}
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="请输入邮箱"
                keyboardType="email-address"
              />
            </View>

            {/* 密码 */}
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>密码</Text>
              <TextInput
                style={styles.inputField}
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                placeholder="请输入密码"
                secureTextEntry
              />
            </View>

            {/* 生日 */}
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>生日</Text>
              <TextInput
                style={styles.inputField}
                value={formData.birthday}
                onChangeText={(text) => handleInputChange('birthday', text)}
                placeholder="YYYY-MM-DD"
              />
            </View>

            {/* 定位 */}
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>定位</Text>
              <TextInput
                style={styles.inputField}
                value={formData.location}
                onChangeText={(text) => handleInputChange('location', text)}
                placeholder="请输入位置"
              />
            </View>
          </View>
        )}

        {/* 通知选项卡内容 */}
        {activeTab === 'notification' && (
          <View style={styles.notificationContent}>
            <Text>通知设置内容区域</Text>
          </View>
        )}
      </ScrollView>

      {/* 底部按钮区域 - 固定在屏幕底部 */}
      <View style={styles.buttonArea}>
        {/* 保存按钮 */}
        {activeTab === 'general' && (
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>保存</Text>
          </TouchableOpacity>
        )}

        {/* 退出按钮 */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => console.log('退出登录')}
        >
          <Text style={styles.logoutButtonText}>退出</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingBottom: 150, // 为底部按钮留出空间
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 21,
    marginBottom: 20,
  },
  tab: {
    width: 41,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginRight: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  activeTab: {
    backgroundColor: '#1890ff',
    borderColor: '#1890ff'
  },
  tabText: {
    fontSize: 12,
    color: '#333'
  },
  activeTabText: {
    color: '#fff'
  },
  formContainer: {
    marginLeft: 28,
    width: 372
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    marginBottom: 26
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 12,
    width: 60,
  },
  inputField: {
    flex: 1,
    height: 52,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  notificationContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonArea: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  saveButton: {
    width: 120,
    height: 48,
    backgroundColor: '#1890ff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  logoutButton: {
    width: 120,
    height: 48,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  }
});

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="账户" component={AccountScreen} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;