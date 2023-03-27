import React from "react";

import { View, Button } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  Feather,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { ProfileScreen } from "./ProfileScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { Home } from "../nestedScreen/Home";

const MainTab = createBottomTabNavigator();

export const PostsScreen = () => {
  return (
    <MainTab.Navigator
      barStyle={{ paddingBottom: 34 }}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 0,
          borderRadius: 15,
          backgroundColor: "#fff",
          height: 83,
        },
      }}
    >
      <MainTab.Screen
        options={{
          title: "Публікації",
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

          headerRight: () => (
            <View
              style={{
                marginRight: 20,
              }}
              onPress={() => alert("This is a button logout!")}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </View>
          ),

          tabBarIcon: ({ focused }) => (
            <SimpleLineIcons
              name="grid"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <MainTab.Screen
        options={{
          title: "Створити публікацію",
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

          tabBarIcon: ({ focused }) => (
            <View>
              {!focused ? (
                <View
                  style={{
                    width: 70,
                    height: 40,
                    backgroundColor: "#FF6C00",
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Feather name="plus" size={24} color="#ffffff" />
                </View>
              ) : (
                <View
                  style={{
                    width: 70,
                    height: 40,
                    backgroundColor: "#F6F6F6",
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={24}
                    color="#DADADA"
                  />
                </View>
              )}
            </View>
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          // headerShown: false,
          title: "Профіль",
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

          tabBarIcon: ({ focused }) => (
            <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
