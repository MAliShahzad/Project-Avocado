import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { NewTask } from "../pages/newTask";

const NewStack = createStackNavigator();

export const NewScreens = () => (
  <NewStack.Navigator>
    <NewStack.Screen
      name="NewTask"
      component={NewTask}
      options={{
        headerTransparent: true,
        title: "",
      }}
    />
  </NewStack.Navigator>
);
