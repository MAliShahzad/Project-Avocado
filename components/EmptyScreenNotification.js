import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
const { width, height } = Dimensions.get("screen");

export const EmptyScreenNotification = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../images/avocado-logo.png")}
        style={{
          width: 90,
          height: 100,
          opacity: 0.5,
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <Text style={styles.logoText}>Nothing to Display</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.9,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    paddingVertical: 15,
    fontSize: 15,
    color: "green",
    letterSpacing: 5,
  },
});
