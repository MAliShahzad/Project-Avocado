import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme, Button, Icon, Card } from "galio-framework";
const { width, height } = Dimensions.get("screen");
import Rating from "../../../components/Rating";
import { RatingView } from "../../../components/RatingView";
import { AuthContext } from "../../Auth/Navigators/context";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
} from "react-native-popup-dialog";
fetchData = async (w) => {
  var response = await fetch("http://182.176.112.68:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const freelancerSelects = async (task_iden) => {
  var params = ["pending = 'No'"];
  params = { table: "details", item: `id= ${task_iden}`, arr: params };
  params = JSON.stringify(params);
  params = "updtask" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  return "Done";
};

const freelancerRejects = async (task_iden) => {
  var params = ["pending = 'Yes', freelancer_name= 'None' "];
  params = { table: "details", item: `id= ${task_iden}`, arr: params };
  params = JSON.stringify(params);
  params = "updtask" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  var params = [`id = ${task_iden}`];
  params = { table: "buyer", item: "user_id", arr: params };
  params = JSON.stringify(params);
  params = "gettask" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }
  let customer_iden = params[0].user_id;

  params = [`id = ${customer_iden}`];
  params = { table: "EXTRA_DATA", item: "user_name", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }
  let customer_name = params[0].user_name;

  params = [`id = ${task_iden}`];
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

  params = [`id = ${freelancer_iden}`];
  params = { table: "EXTRA_DATA", item: "user_name", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }
  let freelancer_name = params[0].user_name;

  params = [`id= ${task_iden} `];
  params = { table: "details", item: "name", arr: params };
  params = JSON.stringify(params);
  params = "gettask" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }
  let task_name = params[0].name;

  params = [
    customer_iden,
    "Task Deleted",
    `${task_name} has been rejected by ${freelancer_name}`,
    "Unread",
  ];
  params = JSON.stringify(params);
  params = "insertnotification" + params;

  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  params = [`id= ${task_iden}`];
  params = { table: "freelancer", arr: params };
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

export const ViewRequest = ({ route, navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();

  const submitHandler = async () => {
    var outcome = await freelancerSelects(route.params.taskDetails.id);
    if (outcome == "Done") {
      alert("Task Accepted");
      navigation.pop();
    }
  };

  const submitHandlerB = async () => {
    var outcome = await freelancerRejects(route.params.taskDetails.id);
    if (outcome == "Done") {
      alert("Task Rejected");
      navigation.pop();
    }
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

  return (
    <View style={styles.container}>
      <Card
        flex
        borderless
        captionColor="rgba(0,0,0,0.4)"
        style={styles.card}
        title="Title"
        caption={route.params.taskDetails.name}
        avatar="https://img.icons8.com/ios-filled/100/000000/title.png"
      />
      <Card
        flex
        borderless
        captionColor="rgba(0,0,0,0.4)"
        style={styles.card}
        title="Category"
        caption={route.params.taskDetails.category}
        avatar="https://img.icons8.com/ios-filled/512/000000/tags.png"
      />
      <TouchableOpacity
        style={{
          height: theme.SIZES.BASE * 6.4,
        }}
        onPress={() => setIsVisible(true)}
      >
        <Card
          flex
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
        flex
        borderless
        captionColor="rgba(0,0,0,0.4)"
        style={styles.card}
        title="Deadline"
        caption={route.params.taskDetails.date.substring(0, 10)}
        avatar="https://img.icons8.com/ios-filled/512/000000/deadline-icon.png"
      />

      <View style={styles.card}>
        <TouchableOpacity onPress={() => downloader()} style={styles.card}>
          <Card
            flex
            borderless
            captionColor="rgba(0,0,0,0.4)"
            style={styles.card}
            title="Attachment"
            caption={route.params.taskDetails.attachment}
            avatar="https://img.icons8.com/ios-filled/512/000000/attach.png"
          />
        </TouchableOpacity>
      </View>

      <Card
        flex
        borderless
        captionColor="rgba(0,0,0,0.4)"
        style={styles.card}
        title="No Freelancer Assigned"
        avatar="https://img.icons8.com/material-sharp/512/000000/user.png"
      />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => submitHandlerB()}
        >
          <Text style={styles.buttonText}>Reject Task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => submitHandler()}>
          <Text style={styles.buttonText}>Accept Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    alignItems: "center",
    // justifyContent: "flex-start",
    paddingVertical: 50,
    justifyContent: "center",
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
    height: theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.6,
  },
  ratingcard: {
    backgroundColor: "#f8ffd7",
    borderWidth: 0,
    marginVertical: theme.SIZES.BASE * 0.6,
    justifyContent: "flex-start",
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 4,
    alignContent: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  button: {
    width: width / 2.5,
    height: 50,
    backgroundColor: "#6b9b37",
    marginVertical: 10,
    marginHorizontal: 10,
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
