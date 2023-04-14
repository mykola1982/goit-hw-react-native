import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { View, Button, TouchableOpacity, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather, SimpleLineIcons } from "@expo/vector-icons";

import { ProfileScreen } from "./ProfileScreen";

import { Home } from "../nestedScreen/Home";
import { logOut } from "../../redux/auth/authOperations";

const MainTab = createBottomTabNavigator();

function MyTabBar({ navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",

        height: 83,
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 2,
        borderTopColor: "#F6F6F6",
        backgroundColor: "#FFFFFF",
      }}
    >
      <TouchableOpacity
        style={{
          flex: 0.3333,
          alignItems: "center",
        }}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <SimpleLineIcons name="grid" size={24} color="rgba(33, 33, 33, 0.8)" />
      </TouchableOpacity>
      <View
        style={{
          flex: 0.3333,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: 70,
            height: 40,
            backgroundColor: "#FF6C00",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("Create");
          }}
        >
          <Feather name="plus" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          flex: 0.3333,
          alignItems: "center",
        }}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <Feather name="user" size={28} color="rgba(33, 33, 33, 0.8)" />
      </TouchableOpacity>
    </View>
  );
}

export const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <MainTab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
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
            // <TouchableOpacity onPress={() => dispatch(logOut())}>
            //   <SimpleLineIcons
            //     style={{ marginRight: 18 }}
            //     name="login"
            //     size={24}
            //     color="#BDBDBD"
            //   />
            // </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginRight: 20,
              }}
              // onPress={() => alert("This is a button logout!")}
              onPress={() => dispatch(logOut())}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
        name="Home"
        component={Home}
      />

      <MainTab.Screen
        options={{
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
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
