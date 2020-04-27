import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AvailableScreen } from "../pages/AvailableScreen";
import { ViewAvailable } from "../pages/ViewAvailable";

const AvailableStack = createStackNavigator();

export const AvailableScreens = () => (
  <AvailableStack.Navigator
    screenOptions={{
      headerTintColor: "green",
    }}
  >
    <AvailableStack.Screen
      name="AvailableScreen"
      component={AvailableScreen}
      options={{
        headerTransparent: true,
        title: "",
      }}
    />
    <AvailableStack.Screen
      name="ViewAvailable"
      component={ViewAvailable}
      options={{
        headerTransparent: true,
        title: "",
        headerStyle: {
          height: 40,
        },
      }}
    />
  </AvailableStack.Navigator>
);
