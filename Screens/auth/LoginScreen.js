import React, { useState } from "react";
import { useDispatch } from "react-redux";
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

import { authStyle } from "./authStyle";

import { authSingInUser } from "../../redux/auth/authOperations";
import Toast from "react-native-root-toast";

const initialState = {
  email: "",
  password: "",
};

const initFocus = { email: false, password: false };

export const LoginScreen = ({ navigation }) => {
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
    if (state.email === "" || state.password === "") {
      Toast.show("Email та Password повинні бути заповнені.", {
        backgroundColor: "red",
        duration: 3000,
        position: 50,
      });

      return;
    }

    dispatch(authSingInUser(state));
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
                <Text style={{ ...authStyle.title, marginBottom: 32 }}>
                  Увійти
                </Text>

                <View
                  style={[
                    authStyle.inputWrapper,
                    hasFocus.email && authStyle.inputWrapperFocus,
                  ]}
                >
                  <TextInput
                    style={authStyle.input}
                    textAlign={"left"}
                    placeholder={"Адреса електронної пошти"}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      onInputFocus("email");
                    }}
                    onBlur={() => onInputBlur("email")}
                    onEndEditing={() => setIsShowKeyboard(false)}
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
                      <Text style={authStyle.btnTitle}>Увійти</Text>
                    </TouchableOpacity>

                    <View style={authStyle.text}>
                      <Text>
                        Немає акаунта?{" "}
                        <Text onPress={() => navigation.navigate("Register")}>
                          Зареєструватися
                        </Text>
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
