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

export const DrawerScreens = ({email, navigation }) => {
  const nameContext = React.useMemo( () => {
    return{
      trackEmail: () => email
    };
  }, []);
  return (
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Home" component={HomeScreens} params = {{email: email}}/>
          <Drawer.Screen name="Profile" component={ProfileScreens} />
        </Drawer.Navigator>
    );
};
