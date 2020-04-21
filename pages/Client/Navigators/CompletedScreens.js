import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { CompletedTask } from "../pages/CompletedTask";
import { CompletedScreen } from "../pages/CompletedScreen";

const CompletedStack = createStackNavigator();

export const CompletedScreens = ({ navigation }) => (
  <CompletedStack.Navigator>
    <CompletedStack.Screen name="CompletedScreen" component={CompletedScreen} />
    <CompletedStack.Screen name="CompletedTask" component={CompletedTask} />
  </CompletedStack.Navigator>
);
