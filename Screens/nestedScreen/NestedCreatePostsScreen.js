import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const NestedCreatePostsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          marginBottom: 300,
        }}
      >
        CreatePostsScreen
      </Text>
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
