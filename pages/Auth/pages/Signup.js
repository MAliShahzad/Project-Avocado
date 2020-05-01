import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Logo from "../../../components/Logo";

export const Signup = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Logo />
      <View
        style={{
          marginVertical: 50,
          justifyContent: "flex-start",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("ClientSignup")}
        >
          <Text style={styles.buttonText}>Sign Up as a Client</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("FreelancerSignup")}
        >
          <Text style={styles.buttonText}>Sign Up as a Free Lancer</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text style={styles.signupButton}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#558b2f",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 300,
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
    paddingVertical: 25,
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
