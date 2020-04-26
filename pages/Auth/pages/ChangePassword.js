import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Logo from "../../../components/Logo";
import { TextBar } from "../../../components/TextBar";

export const ChangePassword = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Logo />
      <View style={{ justifyContent: "flex-start" }}>
        {TextBar("Enter User Name", true)}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert(
              "Sent",
              "An email has been sent to your account. Please follow the steps to change your password. Thanks",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
            //navigation.pop();
          }}
        >
          <Text style={styles.buttonText}>Change Password</Text>
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
    paddingVertical: 300,
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
});
