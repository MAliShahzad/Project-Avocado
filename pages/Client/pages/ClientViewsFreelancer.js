import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Button,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../Auth/Navigators/context";

fetchData = async (w) => {
  var response = await fetch("http://39.46.200.250:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const updateFreelancer = async (customer_email, task_id, freelancer_email) => {
  var params = ["login='" + customer_email + "'"];
  params = { table: "U_SERS", item: "id", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }
  let user_iden = params[0].id;

  params = [`email =\'${freelancer_email}\'`];
  params = { table: "EXTRA_DATA", item: "id,user_name", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }
  let freelancer_iden = params[0].id;
  let freelancer_name = params[0].user_name;

  var item = `id = \'${task_id}\' `;
  params = {
    table: "details",
    item: item,
    arr: [
      `freelancer_name = \'${freelancer_name}\', freelancer_email=\'${freelancer_email}\'`,
    ],
  };
  params = JSON.stringify(params);
  params = "updTask" + params;
  try {
    params = await fetchData(params);
  } catch {
    console.log(err);
    return "";
  }

  params = [task_id, freelancer_iden];
  params = JSON.stringify(params);
  params = "insertfreelancer" + params;
  try {
    params = await fetchData(params);
  } catch {
    console.log(err);
    return "";
  }

  return "Done";
};

//import { Card } from "react-native-elements";

export const ClientViewsFreelancer = ({ route, navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  const submitHandler = async () => {
    var outcome = await updateFreelancer(
      myEmail,
      route.params.task_id,
      route.params.email
    );
    if (outcome == "Done") {
      alert("Request sent to freelancer");
      navigation.pop();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ flex: 1, width: undefined, height: undefined }}
          source={require("../../../images/profile.png")}
        />
      </View>
      <View style={styles.buttonAndText}>
        <View style={styles.textContainer}>
          <Text style={styles.bigText}>{route.params.name}</Text>
          <Text>{route.params.email}</Text>
        </View>
      </View>
      <View style={styles.lowerPortion}>
        <View style={{ padding: 20 }}>
          <Text>Who am I?</Text>
          <Text>{route.params.about_me}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => submitHandler()}>
        <Text style={styles.buttonText}>Request</Text>
      </TouchableOpacity>
    </View>
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
    height: 250,
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
    height: 240,
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
