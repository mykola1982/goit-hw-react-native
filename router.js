import React from "react";

import { StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import { MaterialIcons } from "@expo/vector-icons";

import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import { LoginScreen } from "./Screens/auth/LoginScreen";

import { CommentsScreen } from "./Screens/nestedScreen/CommentsScreen";
import { MapScreen } from "./Screens/nestedScreen/MapScreen";
import { PostsScreen } from "./Screens/mainScreen/PostsScreen";

// ---------------
import { CreatePostsScreen } from "./Screens/mainScreen/CreatePostsScreen";

// ---------------
const AuthStack = createStackNavigator();

const HomeStack = createStackNavigator();

export default function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,

          headerRight: () => (
            <MaterialIcons.Button
              name="logout"
              size={24}
              color="#BDBDBD"
              backgroundColor="#fff"
              onPress={() => alert("This is a button logoutd!")}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарії",
          headerStyle: {
            height: 100,
            backgroundColor: "#ffffff",
            borderBottomWidth: 1,
            borderBottomColor: "#E5E5E5",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Bold",
            fontSize: 17,
            lineHeight: 22,
          },
        }}
      />
      <HomeStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Мапа",
          headerStyle: {
            height: 100,
            backgroundColor: "#ffffff",
            borderBottomWidth: 1,
            borderBottomColor: "#E5E5E5",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Bold",
            fontSize: 17,
            lineHeight: 22,
          },
        }}
      />

      {/* ------------------ */}

      <HomeStack.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          title: "Cтворити публікацію",
          headerStyle: {
            height: 100,
            backgroundColor: "#ffffff",
            borderBottomWidth: 1,
            borderBottomColor: "#E5E5E5",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Bold",
            fontSize: 17,
            lineHeight: 22,
          },
        }}
      />

      {/* ------------------ */}
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({});
