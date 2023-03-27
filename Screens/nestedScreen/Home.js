import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";

export const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home </Text>
      <Button
        title="go to Map Sreen"
        onPress={() => navigation.navigate("Map")}
      />
      <Button
        title="go to Comment Sreen"
        onPress={() => navigation.navigate("Comments")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
