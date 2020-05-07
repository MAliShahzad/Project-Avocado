import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { CompletedScreens } from "../Navigators/CompletedScreens";
import { CurrentScreens } from "../Navigators/CurrentScreens";
import { NewScreens } from "../Navigators/NewScreens";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const client_Tabs = createMaterialTopTabNavigator();

export const TabScreens = () => (
  <client_Tabs.Navigator
    // screenOptions={({ route }) => ({
    //   tabBarIcon: ({ focused, color, size }) => {
    //     let iconName;
    //     if (route.name === "New") {
    //       iconName = focused
    //         ? "ios-information-circle"
    //         : "ios-information-circle-outline";
    //     } else if (route.name === "Current") {
    //       iconName = focused ? "ios-list-box" : "ios-list";
    //     } else if (route.name === "Completed") {
    //       iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
    //     }
    //     return <Ionicons name={iconName} size={size} color={color} />;
    //   },
    // })}
    initialRouteName="CurrentScreen"
    tabBarOptions={{
      activeTintColor: "green",
      inactiveTintColor: "gray",
      indicatorStyle: {
        borderBottomColor: "green",
        borderBottomWidth: 2,
      },
    }}
  >
    <client_Tabs.Screen
      name="CurrentScreen"
      component={CurrentScreens}
      options={{ title: "Current" }}
    />
    <client_Tabs.Screen
      name="CompletedScreen"
      component={CompletedScreens}
      options={{ title: "Completed" }}
    />
    <client_Tabs.Screen
      name="NewTask"
      component={NewScreens}
      options={{ title: "New" }}
    />
  </client_Tabs.Navigator>
);
