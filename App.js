import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import useRoute from "./router";
import { store } from "./Screens/store";

import { authFirebase } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [fontsLoader] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const [user, setUser] = useState(null);
  onAuthStateChanged(authFirebase, (user) => {
    console.log("user change", user);
    setUser(user);
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoader) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const routing = useRoute(user);

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
