import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

export const Background = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg}
        source={require("../../assets/images/photo_bg.jpg")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : ""}
          keyboardVerticalOffset={0}
        >
          {children}
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
