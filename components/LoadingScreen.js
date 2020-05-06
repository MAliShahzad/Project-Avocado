import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
const { width, height } = Dimensions.get("screen");

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../images/avocado-logo.png")}
        style={{ width: 90, height: 100, opacity: 0.5 }}
      />
      <Text style={styles.logoText}>l.o.a.d.i.n.g</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    paddingVertical: 15,
    fontSize: 22,
    color: "green",
    letterSpacing: 5,
  },
});
