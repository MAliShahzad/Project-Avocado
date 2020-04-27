import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { CurrentScreen } from "../pages/CurrentScreen";
import { BrowseFreelancers } from "../pages/BrowseFreelancers";
import { ViewTask } from "../pages/ViewTask";
import { ClientViewsFreelancer } from "../pages/ClientViewsFreelancer";
import { ViewTaskUnassigned } from "../pages/ViewTaskUnassigned";
import { ViewRequests } from "../pages/ViewRequests";
import { ClientViewsRequests } from "../pages/ClientViewsRequests";

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
      name="ViewRequests"
      component={ViewRequests}
      options={{
        headerTransparent: true,
        title: "",
        headerStyle: {
          height: 40,
        },
      }}
    />
    <CurrentStack.Screen
      name="BrowseFreelancers"
      component={BrowseFreelancers}
      options={{
        headerTransparent: true,
        title: "",
        headerStyle: {
          height: 40,
        },
      }}
    />
    <CurrentStack.Screen
      name="ClientViewsFreelancer"
      component={ClientViewsFreelancer}
      options={{
        headerTransparent: true,
        title: "",
        headerStyle: {
          height: 40,
        },
      }}
    />
    <CurrentStack.Screen
      name="ClientViewsRequests"
      component={ClientViewsRequests}
      options={{
        headerTransparent: true,
        title: "",
        headerStyle: {
          height: 40,
        },
      }}
    />
    <CurrentStack.Screen
      name="ViewTaskUnassigned"
      component={ViewTaskUnassigned}
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
