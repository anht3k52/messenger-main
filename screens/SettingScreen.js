import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingScreen = ({ navigation }) => {
    const handleLogout = async () => {
      try {
        // Xóa token hoặc bất kỳ dữ liệu đăng nhập nào khỏi bộ nhớ cục bộ
        await AsyncStorage.removeItem("authToken");
  
        // Đặt lại trạng thái người dùng (nếu cần)
        // Ví dụ: setUserId(null);
  
        // Điều hướng người dùng đến màn hình đăng nhập hoặc màn hình khác
        navigation.replace("Login"); // Điều hướng đến màn hình đăng nhập
  
      } catch (error) {
        console.error("Lỗi đăng xuất:", error);
      }
    };
  
    return (
      <View>
        <Text>Thông tin tài khoản và cài đặt ở đây</Text>
        <Button title="Đăng xuất" onPress={handleLogout} />
      </View>
    );
  };
export default SettingScreen;
