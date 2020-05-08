import * as React from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AuthContext } from "../../Auth/Navigators/context";
import { ProfileScreens } from "./ProfileScreens";
import { HomeScreens } from "./HomeScreens";
import { NotificationScreens } from "./NotificationScreens";
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

fetchData = async (w) => {
  console.log("");
  var response = await fetch("http://182.176.112.68:3000/" + w);
  response = await response.json();
  console.log(response);
  return await response;
};

const getMyImage = async (email) => {
  var params = ["email='" + email + "'"];
  params = { table: "EXTRA_DATA", item: "*", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return params;
  }

  var iden = params[0].id;

  console.log("wait");
  var imger = await fetch(
    "http://182.176.112.68:3000/getimage" + JSON.stringify({ id: iden })
  );
  imger = await imger.json();
  return imger;
};

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const CustomButton = (props) => {
  const { title = "Enter", style = {}, textStyle = {}, onPress, color } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

function CustomDrawerContent(props, { navigation }) {
  const { signOut } = React.useContext(AuthContext);
  const { getEmail } = React.useContext(AuthContext);
  const [isLoading, setLoading] = React.useState(true);
  const [img, setimg] = React.useState("");
  var myEmail = getEmail();

  const getter = async (myEmail) => {
    setimg(await getMyImage(myEmail));
    setLoading(false);
  };
  if (isLoading == true) {
    getter(myEmail);
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
          <TouchableOpacity
            style={{ height: 120, width: 120, borderRadius: 60 }}
            onPress={() => getter(myEmail)}
          >
            <Image
              source={require("../../../images/profile.jpg")}
              style={{ height: 120, width: 120, borderRadius: 60 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ fontFamily: "Roboto" }}>
          <DrawerItemList {...props} />
        </View>
        <DrawerItem
          label="Logout"
          onPress={() => signOut()}
          icon={({ focused }) => (
            <MaterialCommunityIcons name="logout" size={40} color="#98C739" />
          )}
        />
      </DrawerContentScrollView>
    );
  } else {
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
          <TouchableOpacity
            style={{ height: 120, width: 120, borderRadius: 60 }}
            onPress={() => getter(myEmail)}
          >
            <Image
              source={{ uri: "data:image/png;base64," + img }}
              style={{ height: 120, width: 120, borderRadius: 60 }}
            />
          </TouchableOpacity>
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
        name="Notifications"
        component={NotificationScreens}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons name="md-notifications" size={40} color="#98C739" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
