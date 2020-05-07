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

import { LoadingScreen } from "../../../components/LoadingScreen";
//import { Card } from "react-native-elements";

fetchData = async (w) => {
  console.log("");
  var response = await fetch("http://119.153.183.106:3000/" + w);
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
    "http://119.153.183.106:3000/getimage" + JSON.stringify({ id: iden })
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
        <View style={styles.buttonAndText}>
          <View style={styles.textContainer}>
            <Text style={styles.bigText}>{route.params.user_name}</Text>
            <Text>{route.params.email}</Text>
          </View>
        </View>
        <View style={styles.lowerPortion}>
          <View style={{ padding: 20 }}>
            <Text>Who am I?</Text>
            <Text>{route.params.about_me}</Text>
          </View>
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
    height: 400,
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textContainer: {
    padding: 20,
    flex: 2,
  },
  buttonAndText: {
    flexDirection: "row",
  },
  buttonDiv: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  lowerPortion: {
    backgroundColor: "white",
    // flex: 1,
    height: 290,
    // alignItems: "center",
    // justifyContent: "center",
    width: Dimensions.get("window").width,
    borderTopColor: "green",
    borderColor: "white",
    borderWidth: 1,
  },
  name: {
    padding: 20,
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
    width: 300,
    height: 50,
    backgroundColor: "#255d00",
    marginVertical: 10,
    borderRadius: 25,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
});
