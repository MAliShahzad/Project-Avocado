import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { CurrentScreen } from "../pages/CurrentScreen";
import { BrowseFreelancers } from "../pages/BrowseFreelancers";
import { ViewTask } from "../pages/ViewTask";
import { ClientViewsFreelancer } from "../pages/ClientViewsFreelancer";
import { ViewTaskUnassigned } from "../pages/ViewTaskUnassigned";
import { ViewRequests } from "../pages/ViewRequests";
import {ClientViewsRequests} from"../pages/ClientViewsRequests";

const CurrentStack = createStackNavigator();

export const CurrentScreens = () => (
  <CurrentStack.Navigator>
    <CurrentStack.Screen name="CurrentScreen" component={CurrentScreen} />
    <CurrentStack.Screen name="ViewTask" component={ViewTask} />
    <CurrentStack.Screen name="ViewRequests" component={ViewRequests} />
    <CurrentStack.Screen
      name="BrowseFreelancers"
      component={BrowseFreelancers}
    />
    <CurrentStack.Screen
      name="ClientViewsFreelancer"
      component={ClientViewsFreelancer}
    />
    <CurrentStack.Screen
      name="ClientViewsRequests"
      component={ClientViewsRequests}
    />
    <CurrentStack.Screen
      name="ViewTaskUnassigned"
      component={ViewTaskUnassigned}
    />
  </CurrentStack.Navigator>
);
