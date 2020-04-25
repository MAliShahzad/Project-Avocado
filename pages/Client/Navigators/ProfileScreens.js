import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EditProfile from "../pages/editProfile";
import ClientProfile from "../pages/clientProfile";
import EditDescription from "../pages/editDescription";
import { Icon } from "react-native-elements";

const ProfileStack = createStackNavigator();

export const ProfileScreens = ({ navigation }) => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Project Avocado"
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          color: "#98C739",
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
      <ProfileStack.Screen
        name="ClientProfile"
        component={ClientProfile}
        options={{ title: "Client Profile" }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: "Edit Profile" }}
      />
      <ProfileStack.Screen
        name="EditDescription"
        component={EditDescription}
        options={{ title: "Edit Description" }}
      />
    </ProfileStack.Navigator>
  );
};
