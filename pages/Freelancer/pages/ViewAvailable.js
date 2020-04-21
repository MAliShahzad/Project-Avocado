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
import Rating from "../../../components/Rating";
import { RatingView } from "../../../components/RatingView";
import { AuthContext } from "../../Auth/Navigators/context";

fetchData = async (w) => {
  var response = await fetch("http://119.153.131.168:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const freelancerRequestJob = async (task_id, freelancer_email) => {
    var params = ["login=\'" + freelancer_email + "\'"];
    params = { table: 'U_SERS', item: 'id', arr: params };
    params = JSON.stringify(params);
    params = 'getlogin' + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return ""; }
    let freelancer_iden = params[0].id;

    params = [task_id, freelancer_iden];
    params = JSON.stringify(params);
    params = 'insertrequest' + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return ""; }

    return "Done"

}


export const ViewAvailable = ({route, navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  const submitHandler = async () => {
    var outcome = await freelancerRequestJob(route.params.taskDetails.id, myEmail);
    if(outcome == 'Done'){
      alert('Request Submitted');
      navigation.navigate("RequestScreen")
    }
  }
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
          title="No Freelancer Assigned"
          avatar="https://img.icons8.com/material-sharp/512/000000/user.png"
        />
        <TouchableOpacity
        style={styles.button}
        onPress = {() => submitHandler()} 
      >
        <Text
          
          style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>
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
    justifyContent: 'center',
    width
  },
  pic: {
    flexDirection: "row"
  },
  item: {
    paddingVertical: 10
  },

  card: {
    color: "#ffffff",
    backgroundColor: "#f8ffd7",
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.875
  },
  ratingcard: {
    backgroundColor: "#f8ffd7",
    borderWidth: 0,
    marginVertical: theme.SIZES.BASE * 0.875,
    justifyContent: "flex-start",
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 4,
    alignContent: "center",
    borderRadius: 10,
    flexDirection: "row"
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: "#255d00",
    marginVertical: 10,
    borderRadius: 25,
    justifyContent: "center",
    marginLeft: 40
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
  }
});
