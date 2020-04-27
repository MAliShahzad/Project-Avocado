// import * as React from "react";
// import {
//   View,
//   Image,
//   ImageBackground,
//   Text,
//   Dimensions,
//   StyleSheet,
// } from "react-native";
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItem,
//   DrawerItemList,
// } from "@react-navigation/drawer";
// import { AuthContext } from "../../Auth/Navigators/context";
// import { ProfileScreens } from "./ProfileScreens";
// import { HomeScreens } from "./HomeScreens";
// import { NotificationScreens } from "./NotificationScreens";
// import {
//   MaterialIcons,
//   AntDesign,
//   MaterialCommunityIcons,
// } from "@expo/vector-icons";

// const Drawer = createDrawerNavigator();

// function CustomDrawerContent(props, { navigation }) {
//   const { signOut } = React.useContext(AuthContext);
//   const { getEmail } = React.useContext(AuthContext);
//   var myEmail = getEmail();
//   return (
//     <DrawerContentScrollView {...props}>
//       <View
//         style={{
//           height: 250,
//           backgroundColor: "#98C739",
//         }}
//       >
//         <ImageBackground
//           source={require("../../../images/mountains.jpeg")}
//           style={styles.image}
//         >
//           <View style={{ paddingHorizontal: 25 }}>
//             <Image
//               source={require("../../../images/profile.jpg")}
//               style={{ height: 120, width: 120, borderRadius: 60 }}
//             />
//           </View>
//           <View
//             style={{
//               paddingHorizontal: 25,
//             }}
//           >
//             <View
//               style={{
//                 height: 20,
//               }}
//             ></View>

//             <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
//               {myEmail}
//             </Text>
//           </View>
//         </ImageBackground>
//       </View>

//       <View
//         style={{
//           height: 10,
//           backgroundColor: "#8B7136",
//         }}
//       ></View>

//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Logout"
//         onPress={() => signOut()}
//         icon={({ focused }) => (
//           <MaterialCommunityIcons name="logout" size={40} color="#98C739" />
//         )}
//       />
//     </DrawerContentScrollView>
//   );
// }

// export const DrawerScreens = ({ email, navigation }) => {
//   const nameContext = React.useMemo(() => {
//     return {
//       trackEmail: () => email,
//     };
//   }, []);
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//       drawerStyle={{
//         backgroundColor: "white",
//         width: 300,
//       }}
//       drawerContentOptions={{
//         activeTintColor: "#98C739",
//         itemStyle: { marginVertical: 8 },
//         labelStyle: { fontSize: 14 },
//       }}
//     >
//       <Drawer.Screen
//         name="Home"
//         component={HomeScreens}
//         params={{ email: email }}
//         options={{
//           drawerIcon: ({ focused }) => (
//             <MaterialIcons name="home" size={40} color="#98C739" />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Profile"
//         component={ProfileScreens}
//         options={{
//           drawerIcon: ({ focused }) => (
//             <AntDesign name="profile" size={40} color="#98C739" />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Notifications"
//         component={NotificationScreens}
//         params={{ email: email }}
//         options={{
//           drawerIcon: ({ focused }) => (
//             <MaterialIcons name="home" size={40} color="#98C739" />
//           ),
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     //flex: 1,
//     //flexDirection: "column",
//   },
//   image: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "center",
//   },
//   text: {
//     color: "grey",
//     fontSize: 30,
//     fontWeight: "bold",
//   },
// });

import * as React from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  Dimensions,
  StyleSheet,
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
  Ionicons
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
