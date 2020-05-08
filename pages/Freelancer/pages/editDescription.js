import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../Auth/Navigators/context";

fetchData = async (w) => {
  var response = await fetch("http://182.176.112.68:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const changeUserDetails = async (email, item_to_change, new_item, password) => {
  if (item_to_change == "password") {
    var params = ["login='" + email + "'"];
    params = { table: "U_SERS", item: "secrets", arr: params };
    params = JSON.stringify(params);
    params = "getlogin" + params;
    try {
      params = await fetchData(params);
    } catch (err) {
      console.log(err);
      return "";
    }
    if (params.length == 0) {
      return "not user";
    }
    params = params[0];

    if (password != params.secrets) {
      return "invalid password";
    }
    var tester = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/;
    if (!tester.test(new_item)) {
      return "New password not strong";
    }
  }

  var table = "EXTRA_DATA";
  var iden = "email";
  if (item_to_change == "password") {
    item_to_change = "secrets";
    table = "U_SERS";
    iden = "login";
  }
  item_to_change += " =";
  var params = [item_to_change + "'" + new_item + "'"];
  params = { table: table, item: `${iden}= \'${email}\'`, arr: params };
  params = JSON.stringify(params);
  params = "updlogin" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  if (item_to_change == "email =") {
    params = ["login =" + "'" + new_item + "'"];
    params = { table: "U_SERS", item: `login= \'${email}\'`, arr: params };
    params = JSON.stringify(params);
    params = "updlogin" + params;
    try {
      params = await fetchData(params);
    } catch (err) {
      console.log(err);
      return "";
    }
  }
  return "Done";
};

const CustomButton = (props) => {
  const { title = "Enter", style = {}, textStyle = {}, onPress, color } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default function EditDescription({ navigation }) {
  const [Description, setDescription] = useState("");
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();

  const submitHandler = async () => {
    console.log("what");
    var outcome = await changeUserDetails(myEmail, "about_me", Description, "");
    if (outcome == "Done") {
      navigation.navigate("FreelancerProfile");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Edit your Description</Text>
      <View style={{ height: 30 }}></View>
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="Description"
        onChangeText={(val) => setDescription(val)}
        style={{
          //height: 50,
          borderWidth: 1,
          borderRadius: 15,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderColor: "grey",
        }}
      />
      <View style={{ height: 25 }}></View>
      <CustomButton
        title="Submit"
        style={{ backgroundColor: "#98C739" }}
        onPress={() => submitHandler()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: Dimensions.get("window").height,
    padding: 20,
    backgroundColor: "white",
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: Dimensions.get("window").width - 40 - 10,
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
    marginHorizontal: 15,
  },
  text: {
    fontSize: 15,
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
  text1: {
    fontSize: 20,
    //fontWeight: "bold",
  },
});
