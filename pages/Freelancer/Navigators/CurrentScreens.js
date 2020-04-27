import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { CurrentScreen } from "../pages/CurrentScreen";
import { ViewTask } from "../pages/ViewTask";
import { FreelancerViewsClient } from "../pages/FreelancerViewsClient";

const CurrentStack = createStackNavigator();
export const CurrentScreens = () => (
  <CurrentStack.Navigator
    screenOptions={{
      headerTintColor: "green",
    }}
  >
    <CurrentStack.Screen
      name="CurrentScreen"
      component={CurrentScreen}
      options={{
        headerTransparent: true,
        title: "",
      }}
    />
    <CurrentStack.Screen
      name="ViewTask"
      component={ViewTask}
      options={{
        headerTransparent: true,
        title: "",
        headerStyle: {
          height: 40,
        },
      }}
    />
    <CurrentStack.Screen
      name="FreelancerViewsClient"
      component={FreelancerViewsClient}
      options={{
        headerTransparent: true,
        title: "",
        headerStyle: {
          height: 40,
        },
      }}
    />
  </CurrentStack.Navigator>
);
