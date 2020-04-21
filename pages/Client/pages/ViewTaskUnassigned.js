import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Block, Text, theme, Button, Icon, Card } from "galio-framework";
const { width, height } = Dimensions.get("screen");
import { AuthContext } from "../../Auth/Navigators/context";


export const ViewTaskUnassigned = ({route, navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  
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
        caption={route.params.taskDetails.date.substring(0,10)}
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
        title="No Free Lancer Assigned"
        caption=""
        avatar="https://img.icons8.com/material-sharp/512/000000/user.png"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BrowseFreelancers", {category: route.params.taskDetails.category, id: route.params.taskDetails.id})}
      >
        <Text style={styles.buttonText}>Browse Free Lancer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ViewRequests", {id: route.params.taskDetails.id, isLoading: true})}
      >
        <Text style={styles.buttonText}>View Requests</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#558b2f",
    paddingHorizontal: 20,
    alignItems: "center",
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
  button: {
    width: 300,
    height: 50,
    backgroundColor: "#255d00",
    marginVertical: 10,
    borderRadius: 25,
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
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
