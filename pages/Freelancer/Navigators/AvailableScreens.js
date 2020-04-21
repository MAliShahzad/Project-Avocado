import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AvailableScreen } from "../pages/AvailableScreen";
import { ViewAvailable } from "../pages/ViewAvailable";

const AvailableStack = createStackNavigator();

export const AvailableScreens = () => (
  <AvailableStack.Navigator>
    <AvailableStack.Screen name="AvailableScreen" component={AvailableScreen} />
    <AvailableStack.Screen name="ViewAvailable" component={ViewAvailable} />
  </AvailableStack.Navigator>
);
