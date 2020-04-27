import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme, Button, Icon, Card } from "galio-framework";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
} from "react-native-popup-dialog";
const { width, height } = Dimensions.get("screen");
import Rating from "../../../components/Rating";
import { RatingView } from "../../../components/RatingView";
import { AuthContext } from "../../Auth/Navigators/context";

fetchData = async (w) => {
  var response = await fetch("http://119.153.149.207:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const getClientDetails = async (task_id) => {
  var params = [`id=${task_id}`];
  params = { table: "buyer", item: "user_id", arr: params };
  params = JSON.stringify(params);
  params = "gettask" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }
  var iden = params[0].user_id;

  params = ["id='" + iden + "'"];
  params = { table: "EXTRA_DATA", item: "*", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  return params[0];
};

const freelancerTaskComplete = async (task_id) => {
  var params = ["pending = 'Complete'"];
  params = { table: "details", item: `id= ${task_id}`, arr: params };
  params = JSON.stringify(params);
  params = "updtask" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  params = [`id = ${task_id}`];
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

  params = [`id= ${task_id} `];
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
    "Task Complete",
    `${task_name} has been completed`,
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

  return "Done";
};
export const ViewTask = ({ route, navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  const submitHandler = async () => {
    var outcome = await freelancerTaskComplete(route.params.taskDetails.id);
    alert("You have submitted task as complete. Client will be notified.");
    navigation.pop();
  };
  const submitHandlerB = async () => {
    var clientDetails = await getClientDetails(route.params.taskDetails.id);
    navigation.navigate("FreelancerViewsClient", clientDetails);
  };

  let short_status = route.params.taskDetails.status.substring(0, 50);
  if (route.params.taskDetails.status.length > 50)
    short_status = short_status + "...";
  const [isVisible, setIsVisible] = useState(false);

  if (route.params.taskDetails.pending == "No") {
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
            height: theme.SIZES.BASE * 7.8,
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
        <Card
          flex
          borderless
          captionColor="rgba(0,0,0,0.4)"
          style={styles.card}
          title="Attachment"
          caption={route.params.taskDetails.attachment}
          avatar="https://img.icons8.com/ios-filled/512/000000/attach.png"
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => submitHandlerB()}
          >
            <Text style={styles.buttonText}>View Client Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => submitHandler()}
          >
            <Text style={styles.buttonText}>Complete Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
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
        <Card
          flex
          borderless
          captionColor="rgba(0,0,0,0.4)"
          style={styles.card}
          title="Description"
          caption={route.params.taskDetails.status}
          avatar="https://img.icons8.com/ios-filled/512/000000/info.png"
        />
        <Card
          flex
          borderless
          captionColor="rgba(0,0,0,0.4)"
          style={styles.card}
          title="Deadline"
          caption={route.params.taskDetails.date.substring(0, 10)}
          avatar="https://img.icons8.com/ios-filled/512/000000/deadline-icon.png"
        />
        <Card
          flex
          borderless
          captionColor="rgba(0,0,0,0.4)"
          style={styles.card}
          title="Attachment"
          caption={route.params.taskDetails.attachment}
          avatar="https://img.icons8.com/ios-filled/512/000000/attach.png"
        />
        <View style={styles.button}>
          <Text style={styles.buttonText}>Pending Response</Text>
        </View>
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
    height: theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
  ratingcard: {
    backgroundColor: "#c5e1a5",
    borderWidth: 0,
    marginVertical: theme.SIZES.BASE * 0.875,
    justifyContent: "flex-start",
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 4,
    alignContent: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  button: {
    width: 190,
    marginHorizontal: 10,
    height: 50,
    backgroundColor: "#6b9b37",
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
