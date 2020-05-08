import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Logo from "../../../components/Logo";
import { TextBar } from "../../../components/TextBar";
import { AuthContext } from "../Navigators/context";

fetchData = async (w) => {
  console.log("----------------");
  var response = await fetch("http://182.176.112.68:3000/" + w);
  response = await response.json();
  console.log(response);
  return await response;
};

const validatelogin = async (email, password) => {
  // password = await bcrypt.hash(password, rounds);
  email = email.split(" ")[0];

  var params = ["login='" + email + "'"];
  params = { table: "U_SERS", item: "*", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }
  if (params.length == 0) {
    console.log("not user");
    return "not user";
  }

  params = params[0];

  console.log("--");
  // if (email != params.login) {
  //     return "not user"
  // }
  if (password != params.secrets) {
    return "invalid password";
  } else if (password == params.secrets && email == params.login) {
    var role = [`id=${params.id}`];
    role = { table: "roles", item: "*", arr: role };
    role = JSON.stringify(role);
    role = "getlogin" + role;
    try {
      role = await fetchData(role);
    } catch (err) {
      console.log(err);
      return "";
    }
    role = role[0];
    console.log("...");
    return await role.name;
  } else return "not user";
};

export const Login = ({ navigation }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  // const [outcome, setout] = React.useState("-");
  const { clientSignIn, freelancerSignIn } = React.useContext(AuthContext);

  const UserType = async (email, password) => {
    // await setout(await validatelogin(email, password));
    var outcome = await validatelogin(email, password);
    console.log(outcome);
    if (outcome == "customer") {
      clientSignIn(email);
    } else if (outcome == "freelancer") {
      freelancerSignIn(email);
    } else if (outcome == "not user") {
      alert("Email incorrect. Please try again.");
      outcome = "";
    } else if (outcome == "invalid password") {
      alert("Password Incorrect. Please try again.");
      outcome = "";
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <Logo />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Email"
          placeholderTextColor="rgba(0,0,0,0.3)"
          secureTextEntry={false}
          onChangeText={(Email) => setEmail(Email)}
          defaultValue={Email}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          placeholderTextColor="rgba(0,0,0,0.3)"
          secureTextEntry={true}
          onChangeText={(Password) => setPassword(Password)}
          defaultValue={Password}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => UserType(Email, Password)}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>Dont have an account yet? </Text>
          <TouchableOpacity onPress={() => navigation.push("Signup")}>
            <Text style={styles.signupButton}>Sign Up!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>Don't remember your password? </Text>
          <TouchableOpacity onPress={() => navigation.push("ForgotPassword")}>
            <Text style={styles.signupButton}>Forgot Password!</Text>
          </TouchableOpacity>
        </View>
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
    paddingVertical: 200,
    paddingBottom: 300,
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
  signupTextContainer: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 20,
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
});
