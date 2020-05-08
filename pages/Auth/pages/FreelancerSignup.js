import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Picker,
  Dimensions,
} from "react-native";
import Logo from "../../../components/Logo";
import { TextBar } from "../../../components/TextBar";
import { AuthContext } from "../Navigators/context";
const { width, height } = Dimensions.get("screen");
// import { validateSignup } from "../../../temp_fetch";

fetchData = async (w) => {
  var response = await fetch("http://182.176.112.68:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};
const validatePassword = (password) => {
  if (password.length < 8) {
    return false;
  }
  var c = password.charCodeAt(0);
  var num_check = false;

  if (c < 65 || c > 122 || (c > 90 && c < 97)) {
    return false;
  }

  for (let index = 0; index < password.length; index++) {
    var d = password.charCodeAt(index);
    if (d < 65 || d > 122 || (d > 90 && d < 97)) {
      num_check = true;
    }

    if (d == 13 || d == 32 || d == 0 || d == 8) {
      return false;
    }
  }

  return num_check;
};

const validateEmail = (email) => {
  var chec = email.split("@");

  if (email.includes("..") || email.includes(".@") || email.includes("@.")) {
    return false;
  }

  if (chec.length != 2) {
    return false;
  }
  var c = chec[0].charCodeAt(0);

  if (c < 48 || (c > 57 && c < 65) || (c > 90 && c < 97) || c > 122) {
    return false;
  }

  if (chec[1].split(".").length < 2) {
    return false;
  }

  for (let index = 0; index < chec[0].length; index++) {
    c = chec[0].charCodeAt(index);
    if (c < 48 || (c > 57 && c < 65) || (c > 90 && c < 97) || c > 122) {
      if (!(c == 46 || c == 45 || c == 95)) {
        return false;
      }
    }
  }

  for (let index = 0; index < chec[1].length; index++) {
    c = chec[1].charCodeAt(index);
    if (c < 65 || c > 122 || (c > 90 && c < 97)) {
      if (c != 46) {
        return false;
      }
    }
  }

  return true;
};

const validateSignup = async (
  name,
  email,
  password,
  repassword,
  role,
  category
) => {
  email = email.split(" ")[0];
  if (password != repassword) {
    return "Re-entered password wrong";
  }
  // password = await bcrypt.hash(password, rounds);
  var iden = 0;
  if (!validateEmail(email)) {
    return "invalid email";
  }
  if (!validatePassword(password)) {
    return "password not strong";
  }
  for (let index = 0; index < email.length; index++) {
    var num = email.charCodeAt(index);

    iden += Math.pow(num, 3);
  }

  var ver = [`email=\'${email}\'`];
  ver = { table: "EXTRA_DATA", item: "email", arr: ver };
  ver = JSON.stringify(ver);
  ver = "getlogin" + ver;
  try {
    ver = await fetchData(ver);
  } catch (err) {
    console.log(err);
    return "";
  }

  if (ver.length > 0) {
    return "email already exists";
  }

  var params = [password, email, iden];
  params = JSON.stringify(params);
  params = "insertuser" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  params = [iden, role];
  params = JSON.stringify(params);
  params = "insertrole" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  params = [iden, name, category, "", "", email];
  params = JSON.stringify(params);
  params = "insertextradetail" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  return "Sign Up Successful";
};

export const FreelancerSignup = ({ navigation }) => {
  const { freelancerSignIn } = React.useContext(AuthContext);
  const [outcome, setout] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePassword, setRePassword] = React.useState("");
  const [category, setcategory] = useState("");

  const UserType = async (
    name,
    email,
    password,
    repassword,
    usertype,
    jobtype
  ) => {
    setout(
      await validateSignup(name, email, password, repassword, usertype, jobtype)
    );

    // console.log(temp);
  };

  console.log(outcome);
  if (outcome == "Sign Up Successful") freelancerSignIn(email);
  else if (outcome == "invalid email") {
    alert("Inavlid Email. Please retry.");
    setout("");
  } else if (outcome == "invalid_password") {
    alert("Please enter a different password.");
    setout("");
  } else if (outcome == "Re-entered password wrong") {
    alert("Second entry of password did not match.");
    setout("");
  } else if (outcome == "email already exists") {
    alert("You already have an account");
    setout("");
  } else if (outcome == "password not strong") {
    alert("Password not strong");
    setout("");
  }

  const { signIn } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Logo />
      <TextInput
        style={styles.inputBox}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder={"Name"}
        placeholderTextColor="rgba(0,0,0,0.3)"
        secureTextEntry={false}
        onChangeText={(n) => setName(n)}
        defaultValue={name}
      />
      <TextInput
        style={styles.inputBox}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder={"Email"}
        placeholderTextColor="rgba(0,0,0,0.3)"
        secureTextEntry={false}
        onChangeText={(e) => setEmail(e)}
        defaultValue={email}
      />
      <TextInput
        style={styles.inputBox}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder={"Password"}
        placeholderTextColor="rgba(0,0,0,0.3)"
        secureTextEntry={true}
        onChangeText={(p) => setPassword(p)}
        defaultValue={password}
      />
      <TextInput
        style={styles.inputBox}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder={"Re-Enter Password"}
        placeholderTextColor="rgba(0,0,0,0.3)"
        secureTextEntry={true}
        onChangeText={(p) => setRePassword(p)}
        defaultValue={rePassword}
      />
      <View style={styles.inputBox}>
        <TouchableOpacity style={styles.boxStyle} disabled={true}>
          <TouchableOpacity
            style={{ width: width - width / 2.7, marginHorizontal: -5 }}
            disabled={true}
          >
            <Picker
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 14,
              }}
              // mode="dropdown"
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setcategory(itemValue)}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Content Writing" value="Content Writing" />
              <Picker.Item
                label="Program Development"
                value="Program Development"
              />
              <Picker.Item label="Photography" value="Photography" />
              <Picker.Item label="Photo Editing" value="Photo Editing" />
              <Picker.Item label="Video Editing" value="Video Editing" />
            </Picker>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (
            name == "" ||
            email == "" ||
            password == "" ||
            rePassword == "" ||
            category == ""
          ) {
            alert("One or more of the fields are left empty");
          } else {
            UserType(name, email, password, rePassword, "freelancer", category);
          }
        }}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Already have an account? </Text>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.pop(2)}
        >
          <Text style={styles.signupButton}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#558b2f",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
  },
  signupTextContainer: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    // paddingVertical: 25,
    flexDirection: "row",
  },
  signupText: {
    fontSize: 15,
    color: "rgba(255,255,255,0.6)",
  },
  signupButton: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "bold",
    includeFontPadding: true,
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
  inputBox: {
    marginVertical: 10,
    width: 300,
    height: 50,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 25,
    paddingHorizontal: 16,
    color: "#ffffff",
  },
});
