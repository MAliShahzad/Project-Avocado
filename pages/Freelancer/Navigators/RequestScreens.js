import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RequestScreen } from "../pages/RequestScreen";
import { ViewRequest } from "../pages/ViewRequest";

const RequestStack = createStackNavigator();

export const RequestScreens = () => (
  <RequestStack.Navigator
    screenOptions={{
      headerTintColor: "green",
    }}
  >
    <RequestStack.Screen
      name="RequestScreen"
      component={RequestScreen}
      options={{
        headerTransparent: true,
        title: "",
      }}
    />
    <RequestStack.Screen
      name="ViewRequest"
      component={ViewRequest}
      options={{
        headerTransparent: true,
        title: "",
        headerStyle: {
          height: 40,
        },
      }}
    />
  </RequestStack.Navigator>
);
