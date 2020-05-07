import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { AvailableScreens } from "../Navigators/AvailableScreens";
import { CurrentScreens } from "../Navigators/CurrentScreens";
import { RequestScreens } from "../Navigators/RequestScreens";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tabs = createMaterialTopTabNavigator();

export const TabScreens = () => (
  <Tabs.Navigator
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
    <Tabs.Screen
      name="CurrentScreen"
      component={CurrentScreens}
      options={{ title: "Current" }}
    />
    <Tabs.Screen
      name="RequestScreen"
      component={RequestScreens}
      options={{ title: "Request" }}
    />
    <Tabs.Screen
      name="AvailableScreen"
      component={AvailableScreens}
      options={{ title: "Available" }}
    />
  </Tabs.Navigator>
);
