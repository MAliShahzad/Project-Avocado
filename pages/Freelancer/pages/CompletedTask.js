import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Block, Text, theme, Button, Icon, Card } from "galio-framework";
import { RatingView } from "../../../components/RatingView";
import { AuthContext } from "../../Auth/Navigators/context";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
} from "react-native-popup-dialog";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

fetchData = async (w) => {
  var response = await fetch("http://182.176.112.68:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const { width, height } = Dimensions.get("screen");

export const CompletedTask = ({ route, navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  console.log(route.params.taskDetails);
  let short_status = route.params.taskDetails.status.substring(0, 50);
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

  if (route.params.taskDetails.status.length > 50)
    short_status = short_status + "...";
  const [isVisible, setIsVisible] = useState(false);
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
      <TouchableOpacity
        style={{
          height: theme.SIZES.BASE * 6.7,
        }}
        onPress={() => setIsVisible(true)}
      >
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
        caption={route.params.taskDetails.freelancer_name}
        avatar="https://img.icons8.com/material-sharp/512/000000/user.png"
      />
      <Block style={styles.ratingcard}>
        <RatingView stars={route.params.taskDetails.rating} size={40} />
      </Block>
    </View>
  );
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
  ratingcard: {
    backgroundColor: "#c5e1a5",
    borderWidth: 0,
    marginVertical: theme.SIZES.BASE * 0.75,
    justifyContent: "flex-start",
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 3.5,
    justifyContent: "center",
    borderRadius: 70,
  },
  card: {
    color: "#ffffff",
    backgroundColor: "#c5e1a5",
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 3.5,
    marginVertical: theme.SIZES.BASE * 0.75,
  },
});
