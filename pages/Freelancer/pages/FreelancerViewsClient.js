import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("screen");

import { LoadingScreen } from "../../../components/LoadingScreen";
//import { Card } from "react-native-elements";

fetchData = async (w) => {
  console.log("");
  var response = await fetch("http://182.176.112.68:3000/" + w);
  response = await response.json();
  console.log(response);
  return await response;
};

const getImg = async (email) => {
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
  var imger = await fetch(
    "http://182.176.112.68:3000/getimage" + JSON.stringify({ id: iden })
  );
  imger = await imger.json();
  return imger;
};

export const FreelancerViewsClient = ({ route, navigation }) => {
  const [isloading, setloading] = React.useState(true);
  const [imger, setimger] = React.useState("");
  const getter = async () => {
    setimger(await getImg(route.params.email));
    setloading(false);
  };
  if (isloading == true) {
    getter(route.params.email);
    return <LoadingScreen></LoadingScreen>;
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="cover"
            style={{ flex: 1, width: undefined, height: undefined }}
            source={{ uri: "data:image/png;base64," + imger }}
          />
        </View>
      </View>

      <View style={styles.buttonAndText}>
        <View style={styles.textContainer}>
          <Text style={styles.bigText}>{route.params.user_name}</Text>
          <Text style={styles.bigText2}>Freelancer</Text>
          <Text>{route.params.email}</Text>
        </View>
      </View>
      <View style={styles.lowerPortion}>
        <View style={styles.lowerPortion1}>
          <View style={{ paddingBottom: 20 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Who am I?
              </Text>
            </View>
            <Text>{route.params.about_me}</Text>
          </View>

          {/* <View style={{ height: 20 }}></View> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    height: 200,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  imageContainer: {
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.3,
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  bigText2: {
    fontWeight: "bold",
    fontSize: 15,
  },
  textContainer: {
    padding: 20,
    flex: 2,
  },
  buttonAndText: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  buttonDiv: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  lowerPortion: {
    paddingHorizontal: 20,
    backgroundColor: "white",
    // flex: 1,
    height: Dimensions.get("window").height * 0.375,
    // alignItems: "center",
    // justifyContent: "center",
    width: Dimensions.get("window").width,
    borderColor: "white",
    borderWidth: 1,
  },
  lowerPortion1: {
    padding: 10,
    backgroundColor: "white",
    // flex: 1,
    //height: 400,
    // alignItems: "center",
    // justifyContent: "center",
    borderColor: "white",
    borderWidth: 1,
    elevation: 2, // Android
    borderRadius: 20,
  },

  name: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ex: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").heigth,
  },
  textstyle: {
    width: Dimensions.get("window").width,
    padding: 20,
  },
  button: {
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    //backgroundColor: "#98C739",
    elevation: 8, // Android
    height: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  text: {
    fontSize: 10,
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
  container1: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    // flex: 1,
    // backgroundColor: "pink",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
