import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import Stars from "react-native-stars";

export const RatingView = ({ stars, size }) => {
  return (
    <Stars
      display={stars}
      spacing={8}
      count={5}
      starSize={size}
      backingColor="cornsilk"
      fullStar={require("../images/avo-colored.png")}
      emptyStar={require("../images/avo-empty2.png")}
      halfStar={require("../images/avo-colored.png")}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#000000",
    marginBottom: 5
  },
  star: {
    paddingHorizontal: 6,
    opacity: 0
  }
});
