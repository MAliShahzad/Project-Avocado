import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Button,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
//import { Card } from "react-native-elements";

export const FreelancerViewsClient = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ flex: 1, width: undefined, height: undefined }}
          source={require("../../../images/profile.jpg")}
        />
      </View>
      <View style={styles.buttonAndText}>
        <View style={styles.textContainer}>
          <Text style={styles.bigText}>{route.params.user_name}</Text>
          <Text>{route.params.email}</Text>
        </View>
      </View>
      <View style={styles.lowerPortion}>
        <View style={{ padding: 20 }}>
          <Text>Who am I?</Text>
          <Text>{route.params.about_me}</Text>
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    height: 200,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  imageContainer: {
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    height: 250,
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textContainer: {
    padding: 20,
    flex: 2,
  },
  buttonAndText: {
    flexDirection: "row",
  },
  buttonDiv: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  lowerPortion: {
    backgroundColor: "white",
    // flex: 1,
    height: 290,
    // alignItems: "center",
    // justifyContent: "center",
    width: Dimensions.get("window").width,
    borderTopColor: "green",
    borderColor: "white",
    borderWidth: 1,
  },
  name: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ex: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").heigth,
  },
  textstyle: {
    width: Dimensions.get("window").width,
    padding: 20,
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
