import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Alert,
  ScrollView,
  Dimensions
} from "react-native";

import { AuthContext } from "../../Auth/Navigators/context";

fetchData = async (w) => {
  var response = await fetch("http://119.153.131.168:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const validatePassword = (password) => {
    if (password.length < 8) { return false }
    var c = password.charCodeAt(0);
    var num_check = false;

    if (c < 65 || c > 122 || (c > 90 && c < 97)) { return false }

    for (let index = 0; index < password.length; index++) {
        var d = password.charCodeAt(index);
        if (d < 65 || d > 122 || (d > 90 && d < 97)) { num_check = true }

        if (d == 13 || d == 32 || d == 0 || d == 8) { return false }

    }

    return num_check
}





const validateEmail = (email) => {
    var chec = email.split("@");

    if (
        email.includes("..") ||

        email.includes(".@") ||

        email.includes("@.")
    ) { return false }

    if (chec.length != 2) { return false }
    var c = chec[0].charCodeAt(0);


    if (c < 48 || (c > 57 && c < 65) || (c > 90 && c < 97) || c > 122) { return false }



    if (chec[1].split(".").length < 2) { return false }


    for (let index = 0; index < chec[0].length; index++) {
        c = chec[0].charCodeAt(index);
        if (c < 48 || (c > 57 && c < 65) || (c > 90 && c < 97) || c > 122) {
            if (!(c == 46 || c == 45 || c == 95)) {

                return false
            }
        }

    }

    for (let index = 0; index < chec[1].length; index++) {
        c = chec[1].charCodeAt(index);
        if (c < 65 || c > 122 || (c > 90 && c < 97)) {
            if (c != 46) { return false }
        }

    }

    return true




}



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

        if (!validatePassword(new_item)) { return "New password not strong" }

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

        if (!validatePassword(new_item)) { return "New email invalid" }

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

export default function EditProfile({ navigation }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassowrd] = useState("");
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  const submitHandler = async () => {
    console.log(newPassword)
    var outcome = await changeUserDetails(myEmail, "password", newPassword, oldPassword)
    console.log(outcome);
    if(outcome == 'Done'){
      alert("Password Changed")
      navigation.navigate('FreelancerProfile')
    }
    else if(outcome == 'invalid password'){
      alert("Password is invalid");
    }
    else{
      alert("Password not strong")
    }
  }



  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Change Password?</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="********"
          onChangeText={val => setNewPassword(val)}
        />
        <Text>Re-Enter Password?</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="********"
          onChangeText={val => setConfirmPassword(val)}
        />
        <Text>Enter Old Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="********"
          onChangeText={val => setOldPassowrd(val)}
        />
        <View style={{ padding: 10 }}>
          <Button
            title="Submit"
            color="green"
            onPress={() => {
             if(newPassword != confirmPassword){alert("Re-entry of password did not match. Please retry")}
             else{submitHandler()}}}
          />
        </View>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: Dimensions.get("window").width - 60
  }
});
