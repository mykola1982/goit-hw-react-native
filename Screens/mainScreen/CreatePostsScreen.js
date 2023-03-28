import React from "react";
import { View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { NestedCreatePostsScreen } from "../nestedScreen/NestedCreatePostsScreen";

const CreateTab = createBottomTabNavigator();

function CreateTabBar({ navigation }) {
  return (
    <View
      style={{
        height: 83,
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "#FFFFFF",
      }}
    >
      <TouchableOpacity
        style={{
          width: 70,
          height: 40,
          backgroundColor: "#F6F6F6",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={24}
          color="#DADADA"
        />
      </TouchableOpacity>
    </View>
  );
}

export const CreatePostsScreen = () => {
  return (
    <CreateTab.Navigator tabBar={(props) => <CreateTabBar {...props} />}>
      <CreateTab.Screen
        options={{
          headerShown: false,
        }}
        name="CreateNested"
        component={NestedCreatePostsScreen}
      />
    </CreateTab.Navigator>
  );
};
