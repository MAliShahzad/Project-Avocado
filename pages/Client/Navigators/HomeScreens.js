import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import { TabScreens } from "./TabScreens";

const HomeStack = createStackNavigator();

export const HomeScreens = ({ navigation }) => {
  return (
    <HomeStack.Navigator
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
      <HomeStack.Screen name="Project Avocado" component={TabScreens} />
    </HomeStack.Navigator>
  );
};
