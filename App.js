import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import useRoute from "./router";

export default function App() {
  const [fontsLoader] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
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

  const routing = useRoute(null);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
