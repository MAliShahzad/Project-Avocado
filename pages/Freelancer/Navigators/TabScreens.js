import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { AvailableScreens } from "../Navigators/AvailableScreens";
import { CurrentScreens } from "../Navigators/CurrentScreens";
import { RequestScreens } from "../Navigators/RequestScreens";

const Tabs = createBottomTabNavigator();

export const TabScreens = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "New") {
          iconName = focused
            ? "ios-information-circle"
            : "ios-information-circle-outline";
        } else if (route.name === "Current") {
          iconName = focused ? "ios-list-box" : "ios-list";
        } else if (route.name === "Available") {
          iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      }
    })}
    tabBarOptions={{
      activeTintColor: "green",
      inactiveTintColor: "gray"
    }}
  >
    <Tabs.Screen name="CurrentScreen" component={CurrentScreens} />
    <Tabs.Screen name="RequestScreen" component={RequestScreens} />
    <Tabs.Screen name="AvailableScreen" component={AvailableScreens} />
  </Tabs.Navigator>
);
