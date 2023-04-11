import React, { useState, useEffect, createFactory } from "react";
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
} from "react-native";

import { useDispatch } from "react-redux";

import { authSingUpUser } from "../../redux/auth/authOperations";

import Avatar from "../../components/Avatar/Avatar";
import { authStyle } from "./authStyle";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const initFocus = { login: false, email: false, password: false };

export const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [secure, setSecure] = useState(true);
  const [hasFocus, setHasFocus] = useState(initFocus);

  const dispatch = useDispatch();

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

    dispatch(authSingUpUser(state));
    console.log("відправив сабміт");
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
            <View
              style={{
                ...styles.inner,
                paddingBottom: isShowKeyboard ? 32 : 78,
              }}
            >
              <View style={styles.avatarWrapper}>
                <View style={styles.avatar}>
                  <Avatar />
                </View>
              </View>

              <Text style={{ ...authStyle.title, marginBottom: 32 }}>
                Реєстрація
              </Text>

              <View
                style={[
                  authStyle.inputWrapper,
                  hasFocus.login && authStyle.inputWrapperFocus,
                ]}
              >
                <TextInput
                  style={authStyle.input}
                  textAlign={"left"}
                  placeholder={"Логін"}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    onInputFocus("login");
                  }}
                  onBlur={() => onInputBlur("login")}
                  onEndEditing={() => setIsShowKeyboard(false)}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>

              <View
                style={[
                  authStyle.inputWrapper,
                  hasFocus.email && authStyle.inputWrapperFocus,
                  { marginTop: 16 },
                ]}
              >
                <TextInput
                  style={authStyle.input}
                  textAlign={"left"}
                  placeholder={"Адреса електронної пошти"}
                  onEndEditing={() => setIsShowKeyboard(false)}
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
                  authStyle.inputWrapper,
                  hasFocus.password && authStyle.inputWrapperFocus,
                  { marginTop: 16 },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <TextInput
                    style={authStyle.input}
                    textAlign={"left"}
                    placeholder={"Пароль"}
                    secureTextEntry={secure}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      onInputFocus("password");
                    }}
                    onBlur={() => onInputBlur("password")}
                    onEndEditing={() => setIsShowKeyboard(false)}
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
                    style={authStyle.btnInput}
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
                      ...authStyle.btn,
                      marginBottom: 16,
                      marginTop: 43,
                    }}
                    onPress={onSubmit}
                  >
                    <Text style={authStyle.btnTitle}>Зареєструватися</Text>
                  </TouchableOpacity>

                  <View style={authStyle.text}>
                    <Text>
                      Вже є акаунт?
                      <Text onPress={() => navigation.navigate("Login")}>
                        Увійти
                      </Text>
                    </Text>
                  </View>
                </>
              )}
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

    paddingTop: 92,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  avatarWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
  },
});
