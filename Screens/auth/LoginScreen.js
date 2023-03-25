import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";

import Avatar from "../../components/Avatar/Avatar";
import { commonStyle } from "./commonStyle";

const initialState = {
  email: "",
  password: "",
};

const initFocus = { email: false, password: false };

export const LoginScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [secure, setSecure] = useState(true);

  const [hasFocus, setHasFocus] = useState(initFocus);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    setSecure(true);
  };

  const onInputFocus = (name) => {
    setIsShowKeyboard(true);
    setHasFocus((prevState) => ({ ...prevState, [name]: true }));
  };

  const onInputBlur = (name) => {
    setHasFocus((prevState) => ({ ...prevState, [name]: false }));
  };

  const onSubmit = () => {
    keyboardHide();
    console.log(state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bg}
          source={require("../../assets/images/photo_bg.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
            keyboardVerticalOffset={0}
          >
            <View>
              <View
                style={{
                  ...styles.inner,
                  paddingBottom: isShowKeyboard ? 32 : 144,
                }}
              >
                <Text style={{ ...commonStyle.title, marginBottom: 32 }}>
                  Увійти
                </Text>

                <View
                  style={[
                    commonStyle.inputWrapper,
                    hasFocus.email && commonStyle.inputWrapperFocus,
                  ]}
                >
                  <TextInput
                    style={commonStyle.input}
                    textAlign={"left"}
                    placeholder={"Адреса електронної пошти"}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      onInputFocus("email");
                    }}
                    onBlur={() => onInputBlur("email")}
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                  />
                </View>

                <View
                  style={[
                    commonStyle.inputWrapper,
                    hasFocus.password && commonStyle.inputWrapperFocus,
                    { marginTop: 16 },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <TextInput
                      style={commonStyle.input}
                      textAlign={"left"}
                      placeholder={"Пароль"}
                      secureTextEntry={secure}
                      onFocus={() => {
                        setIsShowKeyboard(true);
                        onInputFocus("password");
                      }}
                      onBlur={() => onInputBlur("password")}
                      value={state.password}
                      onChangeText={(value) =>
                        setState((prevState) => ({
                          ...prevState,
                          password: value,
                        }))
                      }
                    />
                  </View>

                  <View>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={commonStyle.btnInput}
                      onPress={() => {
                        setSecure(false);
                      }}
                    >
                      <Text>Показати</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {!isShowKeyboard && (
                  <>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        ...commonStyle.btn,
                        marginBottom: 16,
                        marginTop: 43,
                      }}
                      onPress={onSubmit}
                    >
                      <Text style={commonStyle.btnTitle}>Увійти</Text>
                    </TouchableOpacity>

                    <View style={commonStyle.text}>
                      <Text>
                        Немає акаунта? <Text>Зареєструватися</Text>
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  inner: {
    position: "relative",

    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
