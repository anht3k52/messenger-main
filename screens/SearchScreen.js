import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import axios from "axios";

const SearchScreen = () => {
  const [startDate, setStartDate] = useState(""); // Ngày bắt đầu
  const [endDate, setEndDate] = useState(""); // Ngày kết thúc
  const [searchResults, setSearchResults] = useState([]); // Kết quả tìm kiếm
  const [errorMessage, setErrorMessage] = useState(null); // Thông báo lỗi

  const handleSearch = () => {
    // Gửi yêu cầu tìm kiếm tin nhắn trong khoảng thời gian đã chọn
    axios
      .get(`http://192.168.1.4:8080/search-messages?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => {
        if (response.data) {
          setSearchResults(response.data);
        } else {
          setErrorMessage("Không tìm thấy kết quả.");
        }
      })
      .catch((error) => {
        setErrorMessage("Có lỗi xảy ra khi tìm kiếm tin nhắn.");
        console.log("Error searching for messages", error);
      });
  };

  return (
    <View>
      <Text>Search for Messages</Text>
      <TextInput
        placeholder="Start Date (YYYY-MM-DD)"
        value={startDate}
        onChangeText={(text) => setStartDate(text)}
      />
      <TextInput
        placeholder="End Date (YYYY-MM-DD)"
        value={endDate}
        onChangeText={(text) => setEndDate(text)}
      />
      <Button title="Search" onPress={handleSearch} />

      {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>Sender: {item.senderId.name}</Text>
            <Text>Recipient: {item.recepientId.name}</Text>
            <Text>Message: {item.message}</Text>
            <Text>Timestamp: {item.timeStamp}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchScreen;
