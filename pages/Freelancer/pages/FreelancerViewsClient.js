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

const CustomButton = (props) => {
  const { title = "Enter", style = {}, textStyle = {}, onPress, color } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

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
          <Text style={styles.bigText2}>Client</Text>
          <Text>{route.params.email}</Text>
        </View>
      </View>

      <View style={styles.lowerPortion}>
        <View style={styles.lowerPortion1}>
          <View style={{ paddingBottom: 20 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Who am I?
              </Text>
            </View>

            <Text>{route.params.about_me}</Text>
          </View>

          <View style={{ height: 20 }}></View>
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
    fontSize: 25,
  },
  bigText2: {
    fontWeight: "bold",
    fontSize: 15,
  },
  textContainer: {
    padding: 20,
    flex: 2,
  },
  buttonAndText: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  buttonDiv: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  lowerPortion: {
    paddingHorizontal: 20,
    backgroundColor: "white",
    // flex: 1,
    height: 400,
    // alignItems: "center",
    // justifyContent: "center",
    width: Dimensions.get("window").width,
    borderColor: "white",
    borderWidth: 1,
  },
  lowerPortion1: {
    padding: 10,
    backgroundColor: "white",
    // flex: 1,
    //height: 400,
    // alignItems: "center",
    // justifyContent: "center",
    borderColor: "white",
    borderWidth: 1,
    elevation: 2, // Android
    borderRadius: 20,
  },

  name: {
    padding: 5,
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
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    //backgroundColor: "#98C739",
    elevation: 8, // Android
    height: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  text: {
    fontSize: 10,
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
  container1: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    // flex: 1,
    // backgroundColor: "pink",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
