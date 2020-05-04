import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { CompletedTask } from "../pages/CompletedTask";
import { CompletedScreen } from "../pages/CompletedScreen";
import { Icon } from "react-native-elements";

const CompletedStack = createStackNavigator();

export const CompletedScreens = ({ navigation }) => (
  <CompletedStack.Navigator
    initialRouteName="Project Avocado"
    screenOptions={{
      headerStyle: {
        backgroundColor: "white",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: "green",
        alignSelf: "center",
        flex: 1,
      },
      headerLeft: () => (
        <Icon
          containerStyle={[{ paddingHorizontal: 15 }]}
          name="menu"
          type="menu-outline"
          color="grey"
          onPress={() => navigation.openDrawer()}
        />
      ),
    }}
    initialRouteName="Project Avocado"
    screenOptions={{
      headerStyle: {
        backgroundColor: "white",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: "green",
        alignSelf: "center",
        flex: 1,
      },
      headerLeft: () => (
        <Icon
          containerStyle={[{ paddingHorizontal: 15 }]}
          name="menu"
          type="menu-outline"
          color="grey"
          onPress={() => navigation.openDrawer()}
        />
      ),
    }}
  >
    <CompletedStack.Screen
      name="CompletedScreen"
      component={CompletedScreen}
      options={{ title: "Completed Screen" }}
    />
    <CompletedStack.Screen
      name="CompletedTask"
      component={CompletedTask}
      options={{ title: "Completed Tasks" }}
    />
  </CompletedStack.Navigator>
);
