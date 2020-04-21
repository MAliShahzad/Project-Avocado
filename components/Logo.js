import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../images/avocado-logo.png")}
          style={{ width: 70, height: 80 }}
        />
        <Text style={styles.logoText}>Project Avocado</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center"
    // justifyContent: "flex-end"
    // marginVertical: 50
  },
  logoText: {
    paddingVertical: 15,
    fontSize: 22,
    color: "#c5e1a5",
    letterSpacing: 5
  }
});
