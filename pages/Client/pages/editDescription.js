import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Alert,
  Dimensions
} from "react-native";
import { AuthContext } from "../../Auth/Navigators/context";


fetchData = async (w) => {
  var response = await fetch("http://119.153.131.168:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};



const changeUserDetails = async (email, item_to_change, new_item, password) => {

    if (item_to_change == "password") {
      var params = ["login=\'" + email + "\'"];
      params = { table: 'U_SERS', item: 'secrets', arr: params };
      params = JSON.stringify(params);
      params = 'getlogin' + params;
      try {
          params = await fetchData(params);
      } catch (err) { console.log(err); return ""; };
      if (params.length == 0) { return "not user" }
      params = params[0];

      if (password != params.secrets) { return "invalid password" }
        var tester = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/;
        if (!tester.test(new_item)) { return "New password not strong" }
    }



    var table = "EXTRA_DATA";
    var iden = "email";
    if (item_to_change == "password") { item_to_change = "secrets"; table = "U_SERS"; iden = "login" }
    item_to_change += " ="
    var params = [item_to_change + "\'" + new_item + "\'"];
    params = { table: table, item: `${iden}= \'${email}\'`, arr: params };
    params = JSON.stringify(params);
    params = "updlogin" + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return "" }



    if (item_to_change == "email =") {

        params = ["login =" + "\'" + new_item + "\'"];
        params = { table: "U_SERS", item: `login= \'${email}\'`, arr: params };
        params = JSON.stringify(params);
        params = "updlogin" + params;
        try {
            params = await fetchData(params);
        } catch (err) { console.log(err); return ""; }


    }
    return "Done"

  }

export default function EditDescription({ navigation }) {
  const [Description, setDescription] = useState("");
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();

  const submitHandler = async () => {
    console.log('what')
    var outcome = await changeUserDetails(myEmail, "about_me", Description, "");
    if(outcome == 'Done'){
      navigation.navigate("ClientProfile")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>Edit your Description</Text>
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="Description"
        onChangeText={val => setDescription(val)}
      />
      <View style={{ padding: 10 }}>
        <Button
          title="Submit"
          color="green"
          onPress={() => submitHandler()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: Dimensions.get("window").width - 40 - 10
  }
});
