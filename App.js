import React, { useEffect } from "react";
import { Provider } from "react-redux";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { store } from "./redux/store";
import { RootSiblingParent } from "react-native-root-siblings";

import Main from "./components/Main";

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

  return (
    <Provider store={store}>
      <RootSiblingParent>
        <Main />
      </RootSiblingParent>
    </Provider>
  );
}
