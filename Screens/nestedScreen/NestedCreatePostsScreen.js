import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import { Camera } from "expo-camera";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const initialState = {
  photo: null,
  location: "",
  name: "",
  placeName: "",
  id: "",
  comments: 0,
};

export const NestedCreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);

  // const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  // const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const cameraRef = useRef();
  const { photo, name, location, placeName, id } = state;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasPermission(status === "granted");
        if (status !== "granted") {
          console.log(
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const takePhoto = async () => {
    const postId = Date.now().toString();

    try {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!pickerResult.canceled) {
        setState((prevState) => ({
          ...prevState,
          photo: pickerResult.assets[0].uri,
          id: postId,
        }));
      }
      let locationCoords = await Location.getCurrentPositionAsync({});
      setState((prevState) => ({
        ...prevState,
        location: locationCoords.coords,
      }));
    } catch (error) {
      console.log("take picture", error.message);
    }
  };

  const keyboardHide = () => {
    // setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const publishPost = async () => {
    setState((prevState) => ({
      ...prevState,
      location,
    }));

    console.log(state);
    navigation.navigate("Home", state);
    setState(initialState);
    keyboardHide();
    cancelPreview();
  };

  const createNewPost =
    name === "" || photo === "" || placeName === "" || location === "";

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ScrollView style={styles.container}>
        <View style={styles.mainContainer}>
          <View>
            {photo ? (
              <View style={styles.photoContainer}>
                <Image style={styles.imageBackground} source={{ uri: photo }} />

                <TouchableOpacity style={styles.photoIcon} onPress={takePhoto}>
                  <FontAwesome name="camera" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              </View>
            ) : (
              <Camera
                style={styles.photoContainer}
                ref={cameraRef}
                onCameraReady={() => {
                  setIsCameraReady(true);
                }}
              >
                <TouchableOpacity style={styles.photoIcon} onPress={takePhoto}>
                  <FontAwesome name="camera" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              </Camera>
            )}
          </View>

          {photo ? (
            <Text style={styles.textBottom}>Редагувати фото</Text>
          ) : (
            <Text style={styles.textBottom}>Загрузити фото</Text>
          )}

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              textAlign={"left"}
              placeholder={"Назва ..."}
              value={name}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, name: value }))
              }
              // onEndEditing={() => setIsShowKeyboard(false)}
              placeholderColor={"#BDBDBD"}
              // onFocus={() => {
              //   setIsShowKeyboard(true);
              // }}
            />
            <View
              style={{
                ...styles.input,
                marginBottom: 32,
                flexDirection: "row",
              }}
            >
              <EvilIcons name="location" size={24} color="#BDBDBD" />
              <TextInput
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  flex: 1,
                }}
                textAlign={"left"}
                value={placeName}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    placeName: value,
                  }))
                }
                // onEndEditing={() => setIsShowKeyboard(false)}
                placeholder={"Місцевість ..."}
                placeholderColor={"#BDBDBD"}
                // onFocus={() => {
                //   setIsShowKeyboard(true);
                // }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={
              createNewPost ? styles.btnAddScreen : styles.btnAddScreenActive
            }
            onPress={publishPost}
            disabled={createNewPost}
          >
            <Text style={createNewPost ? styles.btnText : { color: "#ffffff" }}>
              Опубликовать
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 16,
    position: "relative",
  },
  photoContainer: {
    height: 240,
    backgroundColor: "#F6F6F6",
    position: "relative",
    marginTop: 32,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",

    justifyContent: "center",
    alignItems: "center",
  },

  imageBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 240,
  },
  photoIcon: {
    width: 60,
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textBottom: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 48,
  },
  form: {
    width: "100%",
  },
  input: {
    borderBottomWidth: 1,
    paddingBottom: 16,
    borderBottomColor: "#E8E8E8",
    backgroundColor: "#ffffff",
    marginBottom: 47,
    color: "#212121",
    fontSize: 16,
  },

  btnAddScreen: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
    paddingTop: 16,
  },
  btnAddScreenActive: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
    paddingTop: 16,
  },
  btnText: {
    color: "#BDBDBD",
  },
});
