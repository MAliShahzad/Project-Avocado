import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Picker
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

const customerTaskComplete = async (task_id, rating, customer_email) => {

    var params = ["login=\'" + customer_email + "\'"];
    params = { table: 'U_SERS', item: 'id', arr: params };
    params = JSON.stringify(params);
    params = 'getlogin' + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return ""; }
    let customer_iden = params[0].id;



    params = ["id=\'" + task_id + "\'"];
    params = { table: 'freelancer', item: 'user_id', arr: params };
    params = JSON.stringify(params);
    params = 'gettask' + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return ""; }
    let freelancer_iden = params[0].user_id;



    params = [freelancer_iden, task_id, rating];
    params = JSON.stringify(params);
    params = "insertfhistory" + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return ""; }


    params = [customer_iden, task_id, rating];
    params = JSON.stringify(params);
    params = "insertchistory" + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return ""; }



    params = [`id= ${freelancer_iden}`];
    params = { table: "ratings", arr: params };
    params = JSON.stringify(params);
    params = "delfreelancer" + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return ""; }


    params = [`id = ${freelancer_iden}`];
    params = { table: "history", item: `AVG(ratings)`, arr: params };
    console.log(params);
    params = JSON.stringify(params);
    params = "getfreelancer" + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return ""; }

    params = params[0];
    params = params['AVG(ratings)'];



    params = [freelancer_iden, params]
    params = JSON.stringify(params);
    params = "insertfrating" + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return ""; }


    var params = [`id= ${task_id}`];
    params = { table: "freelancer", arr: params };
    params = JSON.stringify(params);
    params = "deltask" + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return ""; }

    params = [`id= ${task_id}`];
    params = { table: "buyer", arr: params };
    params = JSON.stringify(params);
    params = "deltask" + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return ""; }








    return "Done"



}

export const ViewTask = ({route, navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  const [rating, setRating] = React.useState(0);

  const submitHandler = async () => {
    var outcome = await customerTaskComplete(route.params.taskDetails.id, rating, myEmail);
    alert("Rating submitted")
  }
  if(route.params.taskDetails.pending == 'Complete'){return (
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
       <View style= {{margin: 10, justifyContent: 'center', marginLeft: 17, borderWidth: 1, width: 335, height: 40}}>
          <Picker
            style = {{marginLeft: 130, marginRight: 78,transform: [{ scaleX: 0.85 }, { scaleY: 0.85 },]}}
            selectedValue = {rating}
            onValueChange = {(itemValue, itemIndex) => setRating(itemValue)}>
            <Picker.Item label="Select" value = {-1}/>
            <Picker.Item label="1" value = {1}/>
            <Picker.Item label="2" value = {2}/>
            <Picker.Item label="3" value = {3}/>
            <Picker.Item label="4" value = {4}/>
            <Picker.Item label="5" value = {5}/>
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>{
            if(rating == -1 || rating == 0){
              alert("Please rate before proceeding.")
            }
            else{
              submitHandler();
            }
          }}
      >
        <Text style={styles.buttonText}>Rate Freelancer and Finish</Text>
      </TouchableOpacity>
      </View>
    );}
  else if(route.params.taskDetails.pending == 'No'){return (
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
          title="Free Lancer Assigned"
          caption={route.params.taskDetails.freelancer_name + " (" + route.params.taskDetails.freelancer_email + ")"}
          avatar="https://img.icons8.com/material-sharp/512/000000/user.png"
        />
      </View>
    );}
    else{return (
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
          caption= "Pending"
          avatar="https://img.icons8.com/material-sharp/512/000000/user.png"
        />
      </View>
    );}
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
    flexDirection: "row",

  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: "#255d00",
    marginVertical: 10,
    borderRadius: 25,
    justifyContent: "center",
    marginLeft: 38,
    marginRight: 35
  },
});