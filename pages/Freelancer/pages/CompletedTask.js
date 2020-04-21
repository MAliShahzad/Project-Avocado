import React, { Component } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { Block, Text, theme, Button, Icon, Card } from "galio-framework";
import Rating from "../../../components/Rating";
import { AuthContext } from "../../Auth/Navigators/context";

fetchData = async (w) => {
  var response = await fetch("http://119.153.131.168:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const { width, height } = Dimensions.get("screen");

export const CompletedTask = ({route,  navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  console.log(route.params.taskDetails)
  return (
    <View style={styles.container}>
      <Card
        flex
        borderless
        style={styles.card}
        title="Title"
        caption={route.params.taskDetails.name}
        avatar="https://img.icons8.com/ios-filled/100/000000/title.png"
      />
      <Card
        flex
        borderless
        style={styles.card}
        title="Category"
        caption={route.params.taskDetails.category}
        avatar="https://img.icons8.com/ios-filled/512/000000/tags.png"
      />
      <Card
        flex
        borderless
        style={styles.card}
        title="Description"
        caption={route.params.taskDetails.status}
        avatar="https://img.icons8.com/ios-filled/512/000000/info.png"
      />
      <Card
        flex
        borderless
        style={styles.card}
        title="Deadline"
        caption={route.params.taskDetails.date}
        avatar="https://img.icons8.com/ios-filled/512/000000/deadline-icon.png"
      />
      <Card
        flex
        borderless
        style={styles.card}
        title="Attachment"
        caption={route.params.taskDetails.attachment}
        avatar="https://img.icons8.com/ios-filled/512/000000/attach.png"
      />
      <Card
        flex
        borderless
        style={styles.card}
        title="Free Lancer Assigned"
        caption={route.params.taskDetails.freelancer_name}
        avatar="https://img.icons8.com/material-sharp/512/000000/user.png"
      />
      <Block flex style={styles.ratingcard}>
        <Rating number = {route.params.taskDetails.rating}/>
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#558b2f",
    paddingHorizontal: 20,
    // alignItems: "",
    // justifyContent: "flex-start",
    paddingVertical: 50,
    width
  },
  pic: {
    flexDirection: "row"
  },
  item: {
    paddingVertical: 10
  },
  ratingcard: {
    backgroundColor: "#f8ffd7",
    borderWidth: 0,
    marginVertical: theme.SIZES.BASE * 0.875,
    justifyContent: "flex-start",
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 4,
    justifyContent: "center",
    borderRadius: 70
  },
  card: {
    color: "#ffffff",
    backgroundColor: "#f8ffd7",
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.875
  }
});
