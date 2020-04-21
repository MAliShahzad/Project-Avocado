import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { CurrentScreen } from "../pages/CurrentScreen";
import { ViewTask } from "../pages/ViewTask";
import { FreelancerViewsClient } from "../pages/FreelancerViewsClient";


const CurrentStack = createStackNavigator();
export const CurrentScreens = () => (
  <CurrentStack.Navigator>
    <CurrentStack.Screen name="CurrentScreen" component={CurrentScreen} />
    <CurrentStack.Screen name="ViewTask" component={ViewTask} />
    <CurrentStack.Screen
      name="FreelancerViewsClient"
      component={FreelancerViewsClient}
    />
  </CurrentStack.Navigator>
);
