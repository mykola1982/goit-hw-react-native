import React, { useState, useEffect } from "react";

import Toast from "react-native-root-toast";
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

import { useDispatch } from "react-redux";

import { authSingUpUser } from "../../redux/auth/authOperations";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AntDesign } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import Spinner from "react-native-loading-spinner-overlay";

import { authStyle } from "./authStyle";

const initialState = {
  login: "",
  email: "",
  password: "",
  avatar: "",
};

const initFocus = { login: false, email: false, password: false };

export const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [secure, setSecure] = useState(true);
  const [hasFocus, setHasFocus] = useState(initFocus);
  const [hasPermission, setHasPermission] = useState(null);

  const { avatar } = state;

  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoad(true);
      try {
        if (Platform.OS !== "web") {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          setHasPermission(status === "granted");
          if (status !== "granted") {
            console.log(
              "Sorry, we need camera roll permissions to make this work!"
            );
          }
          setLoad(false);
        }
      } catch (error) {
        setLoad(false);
        setError(error.message);
        Toast.show(`${error}`, {
          backgroundColor: "red",
          duration: 3000,
          position: 50,
        });
      }
    })();
  }, []);

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

  const uploadAvatarFromGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setState((prevState) => ({
          ...prevState,
          avatar: result.assets[0].uri,
        }));
      }
    } catch (error) {
      setError(`Upload avatar error ${error.message}`);
      Toast.show(`${error}`, {
        backgroundColor: "red",
        duration: 3000,
        position: 50,
      });
    }
  };

  const uploadAvatarToServer = async () => {
    setLoad(true);
    try {
      const response = await fetch(avatar);
      const file = await response.blob();

      const avatarId = Date.now().toString();

      const storageRef = ref(storage, `avatars/${avatarId}`);
      await uploadBytes(storageRef, file);

      const avatarRef = await getDownloadURL(storageRef);
      setLoad(false);
      return avatarRef;
    } catch (error) {
      setLoad(false);

      Toast.show(`${error}`, {
        backgroundColor: "red",
        duration: 3000,
        position: 50,
      });
    }
  };

  const onSubmit = async () => {
    if (state.avatar === "") {
      Toast.show("Avatar повинен бути заповнений", {
        backgroundColor: "red",
        duration: 3000,
        position: 50,
      });

      return;
    }

    if (state.email === "" || state.password === "" || state.login === "") {
      Toast.show("Email, Password та Login повинні бути заповнені.", {
        backgroundColor: "red",
        duration: 3000,
        position: 50,
      });
      return;
    }

    setLoad(true);

    try {
      const avatarRef = await uploadAvatarToServer();
      setIsShowKeyboard(false);
      Keyboard.dismiss();
      keyboardHide();
      dispatch(authSingUpUser({ ...state, avatar: avatarRef }));

      setState(initialState);
      setLoad(false);
    } catch (error) {
      setLoad(false);

      Toast.show(`${error}`, {
        backgroundColor: "red",
        duration: 3000,
        position: 50,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <>
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
                  <View style={styles.userImage}>
                    {avatar && (
                      <Image
                        source={{ uri: avatar }}
                        alt="Your avatar"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 16,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      style={styles.btnAdd}
                      onPress={uploadAvatarFromGallery}
                    >
                      <AntDesign
                        name="pluscircleo"
                        size={24}
                        color={"#FF6C00"}
                      />
                    </TouchableOpacity>
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
                      setState((prevState) => ({
                        ...prevState,
                        login: value,
                      }))
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
                      setState((prevState) => ({
                        ...prevState,
                        email: value,
                      }))
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
        </>

        {load && (
          <Spinner
            visible={true}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        )}
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

  userImage: {
    position: "absolute",
    top: -60,

    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  btnAdd: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    maxWidth: 25,
  },
});
