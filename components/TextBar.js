import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";

export const TextBar = (title, secure) => {
  return (
    <TextInput
      style={styles.inputBox}
      underlineColorAndroid="rgba(0,0,0,0)"
      placeholder={title}
      placeholderTextColor="rgba(0,0,0,0.3)"
      secureTextEntry={secure}
    />
  );
};

const styles = StyleSheet.create({
  inputBox: {
    marginVertical: 10,
    width: 300,
    height: 50,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 25,
    paddingHorizontal: 16,
    color: "#ffffff"
  }
});
