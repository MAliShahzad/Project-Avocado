import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Picker,
  Alert,
} from "react-native";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
} from "react-native-popup-dialog";
import Stars from "react-native-stars";
import { Block, Text, theme, Button, Icon, Card } from "galio-framework";
const { width, height } = Dimensions.get("screen");
import Rating from "../../../components/Rating";
import { RatingView } from "../../../components/RatingView";
import { AuthContext } from "../../Auth/Navigators/context";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

fetchData = async (w) => {
  var response = await fetch("http://182.176.112.68:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const customerTaskComplete = async (task_id, rating, customer_email) => {
  var params = ["login='" + customer_email + "'"];
  params = { table: "U_SERS", item: "id", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }
  let customer_iden = params[0].id;

  params = ["id='" + task_id + "'"];
  params = { table: "freelancer", item: "user_id", arr: params };
  params = JSON.stringify(params);
  params = "gettask" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }
  let freelancer_iden = params[0].user_id;

  params = [freelancer_iden, task_id, rating];
  params = JSON.stringify(params);
  params = "insertfhistory" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  params = [customer_iden, task_id, rating];
  params = JSON.stringify(params);
  params = "insertchistory" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  params = [`id= ${freelancer_iden}`];
  params = { table: "ratings", arr: params };
  params = JSON.stringify(params);
  params = "delfreelancer" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  params = [`id = ${freelancer_iden}`];
  params = { table: "history", item: `AVG(ratings)`, arr: params };
  console.log(params);
  params = JSON.stringify(params);
  params = "getfreelancer" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  params = params[0];
  params = params["AVG(ratings)"];

  params = [freelancer_iden, params];
  params = JSON.stringify(params);
  params = "insertfrating" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  var params = [`id= ${task_id}`];
  params = { table: "freelancer", arr: params };
  params = JSON.stringify(params);
  params = "deltask" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  params = [`id= ${task_id}`];
  params = { table: "buyer", arr: params };
  params = JSON.stringify(params);
  params = "deltask" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  return "Done";
};

export const ViewTask = ({ route, navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  const [rating, setRating] = React.useState(0);

  const submitHandler = async () => {
    var outcome = await customerTaskComplete(
      route.params.taskDetails.id,
      rating,
      myEmail
    );
    alert("Rating submitted");
  };

  let short_status = route.params.taskDetails.status.substring(0, 50);
  if (route.params.taskDetails.status.length > 50)
    short_status = short_status + "...";
  const [isVisible, setIsVisible] = useState(false);

  const downloader = async () => {
    Alert.alert(
      "Downloading",
      `Your attachement is downloading`,
      [
        {
          text: "Cancel Download",
          onPress: () => {
            return;
          },
        },
      ],
      { cancelable: false }
    );
    var response = await fetch(
      "http://182.176.112.68:3000/getfile" +
        JSON.stringify({ id: route.params.taskDetails.id })
    );
    response = await response.json();
    if (response == "Not") {
      Alert.alert(
        "No attachment",
        `No file was attached to this task`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return;
    }
    try {
      var filename = (await FileSystem.documentDirectory) + response.filename;
      var respie = await FileSystem.writeAsStringAsync(
        filename,
        response.file,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );

      var resp = await MediaLibrary.requestPermissionsAsync();

      resp = await MediaLibrary.createAssetAsync(
        `${FileSystem.documentDirectory}${response.filename}`
      );
      Alert.alert(
        "Download Done",
        `${response.filename} has been downloaded`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } catch (err) {
      Alert.alert(
        "Error",
        `Corrupted File uploaded by client`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
    console.log(resp);
  };

  if (route.params.taskDetails.pending == "Complete") {
    return (
      <View style={styles.container}>
        <Card
          borderless
          captionColor="rgba(0,0,0,0.4)"
          style={styles.card}
          title="Title"
          caption={route.params.taskDetails.name}
          avatar="https://img.icons8.com/ios-filled/100/000000/title.png"
        />
        <Card
          borderless
          captionColor="rgba(0,0,0,0.4)"
          style={styles.card}
          title="Category"
          caption={route.params.taskDetails.category}
          avatar="https://img.icons8.com/ios-filled/512/000000/tags.png"
        />
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Card
            borderless
            captionColor="rgba(0,0,0,0.4)"
            style={styles.card}
            title="Description"
            caption={short_status}
            avatar="https://img.icons8.com/ios-filled/512/000000/info.png"
          />
        </TouchableOpacity>
        <Dialog
          visible={isVisible}
          dialogTitle={<DialogTitle title="Task Description" />}
          footer={
            <DialogFooter>
              <DialogButton text="OK" onPress={() => setIsVisible(false)} />
            </DialogFooter>
          }
        >
          <DialogContent>
            <Text>{route.params.taskDetails.status}</Text>
          </DialogContent>
        </Dialog>
        <Card
          borderless
          captionColor="rgba(0,0,0,0.4)"
          style={styles.card}
          title="Deadline"
          caption={route.params.taskDetails.date}
          avatar="https://img.icons8.com/ios-filled/512/000000/deadline-icon.png"
        />
        <TouchableOpacity style={styles.card} onPress={() => downloader()}>
          <Card
            borderless
            captionColor="rgba(0,0,0,0.4)"
            style={styles.card}
            title="Attachment"
            caption={route.params.taskDetails.attachment}
            avatar="https://img.icons8.com/ios-filled/512/000000/attach.png"
          />
        </TouchableOpacity>
        <Block style={styles.ratingcard}>
          <Stars
            half={true}
            default={2.5}
            update={(itemValue, itemIndex) => setRating(itemValue)}
            spacing={30}
            starSize={40}
            count={5}
            fullStar={require("../../../images/avo-colored.png")}
            emptyStar={require("../../../images/avo-empty2.png")}
            halfStar={require("../../../images/avo-colored.png")}
          />
        </Block>
        {/* selectedValue={rating}
            onValueChange={(itemValue, itemIndex) => setRating(itemValue)} */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (rating == -1 || rating == 0) {
              alert("Please rate before proceeding.");
            } else {
              submitHandler();
            }
          }}
        >
          <Text style={styles.buttonText}>Rate Freelancer and Finish</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (route.params.taskDetails.pending == "No") {
    return (
      <View style={styles.container}>
        <Card
          borderless
          captionColor="rgba(0,0,0,0.4)"
          style={styles.card}
          title="Title"
          caption={route.params.taskDetails.name}
          avatar="https://img.icons8.com/ios-filled/100/000000/title.png"
        />
        <Card
          borderless
          captionColor="rgba(0,0,0,0.4)"
          style={styles.card}
          title="Category"
          caption={route.params.taskDetails.category}
          avatar="https://img.icons8.com/ios-filled/512/000000/tags.png"
        />
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Card
            borderless
            captionColor="rgba(0,0,0,0.4)"
            style={styles.card}
            title="Description"
            caption={short_status}
            avatar="https://img.icons8.com/ios-filled/512/000000/info.png"
          />
        </TouchableOpacity>
        <Dialog
          visible={isVisible}
          dialogTitle={<DialogTitle title="Task Description" />}
          footer={
            <DialogFooter>
              <DialogButton text="OK" onPress={() => setIsVisible(false)} />
            </DialogFooter>
          }
        >
          <DialogContent>
            <Text>{route.params.taskDetails.status}</Text>
          </DialogContent>
        </Dialog>
        <Card
          borderless
          captionColor="rgba(0,0,0,0.4)"
          style={styles.card}
          title="Deadline"
          caption={route.params.taskDetails.date.substring(0, 10)}
          avatar="https://img.icons8.com/ios-filled/512/000000/deadline-icon.png"
        />
        <TouchableOpacity style={styles.card} onPress={() => downloader()}>
          <Card
            borderless
            captionColor="rgba(0,0,0,0.4)"
            style={styles.card}
            title="Attachment"
            caption={route.params.taskDetails.attachment}
            avatar="https://img.icons8.com/ios-filled/512/000000/attach.png"
          />
        </TouchableOpacity>
        <Card
          borderless
          captionColor="rgba(0,0,0,0.4)"
          style={styles.card}
          title="Free Lancer Assigned"
          caption={
            route.params.taskDetails.freelancer_name +
            " (" +
            route.params.taskDetails.freelancer_email +
            ")"
          }
          avatar="https://img.icons8.com/material-sharp/512/000000/user.png"
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Card
          borderless
          captionColor="rgba(0,0,0,0.4)"
          style={styles.card}
          title="Title"
          caption={route.params.taskDetails.name}
          avatar="https://img.icons8.com/ios-filled/100/000000/title.png"
        />
        <Card
          borderless
          captionColor="rgba(0,0,0,0.4)"
          style={styles.card}
          title="Category"
          caption={route.params.taskDetails.category}
          avatar="https://img.icons8.com/ios-filled/512/000000/tags.png"
        />
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Card
            borderless
            captionColor="rgba(0,0,0,0.4)"
            style={styles.card}
            title="Description"
            caption={short_status}
            avatar="https://img.icons8.com/ios-filled/512/000000/info.png"
          />
        </TouchableOpacity>
        <Dialog
          visible={isVisible}
          dialogTitle={<DialogTitle title="Task Description" />}
          footer={
            <DialogFooter>
              <DialogButton text="OK" onPress={() => setIsVisible(false)} />
            </DialogFooter>
          }
        >
          <DialogContent>
            <Text>{route.params.taskDetails.status}</Text>
          </DialogContent>
        </Dialog>
        <Card
          borderless
          captionColor="rgba(0,0,0,0.4)"
          style={styles.card}
          title="Deadline"
          caption={route.params.taskDetails.date}
          avatar="https://img.icons8.com/ios-filled/512/000000/deadline-icon.png"
        />
        <TouchableOpacity style={styles.card} onPress={() => downloader()}>
          <Card
            borderless
            captionColor="rgba(0,0,0,0.4)"
            style={styles.card}
            title="Attachment"
            caption={route.params.taskDetails.attachment}
            avatar="https://img.icons8.com/ios-filled/512/000000/attach.png"
          />
        </TouchableOpacity>
        <Card
          borderless
          captionColor="rgba(0,0,0,0.4)"
          style={styles.card}
          title="Free Lancer Assigned"
          caption="Pending"
          avatar="https://img.icons8.com/material-sharp/512/000000/user.png"
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    alignItems: "center",
    // justifyContent: "flex-start",
    paddingVertical: 50,
    width,
  },
  pic: {
    flexDirection: "row",
  },
  item: {
    paddingVertical: 10,
  },

  card: {
    color: "#ffffff",
    backgroundColor: "#c5e1a5",
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 3.5,
    marginVertical: theme.SIZES.BASE * 0.75,
  },
  ratingcard: {
    backgroundColor: "#c5e1a5",
    borderWidth: 0,
    marginVertical: theme.SIZES.BASE * 0.875,
    justifyContent: "center",
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 3.5,
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  buttonText: {
    fontSize: width / 30,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: "#6b9b37",
    marginVertical: 10,
    borderRadius: 25,
    justifyContent: "center",
    marginLeft: 38,
    marginRight: 35,
  },
});
