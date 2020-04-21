import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RequestScreen } from "../pages/RequestScreen";
import { ViewRequest } from "../pages/ViewRequest";

const RequestStack = createStackNavigator();

export const RequestScreens = () => (
  <RequestStack.Navigator>
    <RequestStack.Screen name="RequestScreen" component={RequestScreen} />
    <RequestStack.Screen name="ViewRequest" component={ViewRequest} />
  </RequestStack.Navigator>
);
