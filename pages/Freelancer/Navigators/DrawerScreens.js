import * as React from "react";
import { View, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from "@react-navigation/drawer";
import { AuthContext } from "../../Auth/Navigators/context";
import { ProfileScreens } from "./ProfileScreens";
import { HomeScreens } from "./HomeScreens";
import { CompletedScreens } from "../Navigators/CompletedScreens";

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
          justifyContent: "center"
        }}
      >
        <Image
          source={require("../../../images/profile.png")}
          style={{ height: 120, width: 120, borderRadius: 60 }}
        />
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => signOut()} />
    </DrawerContentScrollView>
  );
}

export const DrawerScreens = ({ navigation }) => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreens} />
      <Drawer.Screen name="Profile" component={ProfileScreens} />
      <Drawer.Screen name="Completed Tasks" component={CompletedScreens} />
    </Drawer.Navigator>
  );
};
