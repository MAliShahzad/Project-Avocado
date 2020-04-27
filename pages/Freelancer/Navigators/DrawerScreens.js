import * as React from "react";
import { View, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AuthContext } from "../../Auth/Navigators/context";
import { ProfileScreens } from "./ProfileScreens";
import { HomeScreens } from "./HomeScreens";
import { CompletedScreens } from "../Navigators/CompletedScreens";

import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props, { navigation }) {
  const { signOut } = React.useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          height: 150,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../../images/profile.jpg")}
          style={{ height: 120, width: 120, borderRadius: 60 }}
        />
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => signOut()}
        icon={({ focused }) => (
          <MaterialCommunityIcons name="logout" size={40} color="#98C739" />
        )}
      />
    </DrawerContentScrollView>
  );
}

export const DrawerScreens = ({ navigation }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: "#98C739",
        itemStyle: { marginVertical: 8 },
        labelStyle: { fontSize: 14 },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreens}
        options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons name="home" size={40} color="#98C739" />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreens}
        options={{
          drawerIcon: ({ focused }) => (
            <AntDesign name="profile" size={40} color="#98C739" />
          ),
        }}
      />
      <Drawer.Screen
        name="Completed Tasks"
        component={CompletedScreens}
        options={{
          drawerIcon: ({ focused }) => (
            <AntDesign name="check" size={40} color="#98C739" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
