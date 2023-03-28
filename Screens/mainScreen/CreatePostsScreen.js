import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export const CreatePostsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          marginBottom: 300,
        }}
      >
        CreatePostsScreen
      </Text>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 83,
        }}
      >
        <TouchableOpacity
          style={{
            width: 70,
            height: 40,
            backgroundColor: "#F6F6F6",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={24}
            color="#DADADA"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
