import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
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

fetchData = async (w) => {
  var response = await fetch("http://119.153.155.35:3000/" + w);
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
      <Card
        borderless
        captionColor="rgba(0,0,0,0.4)"
        style={styles.card}
        title="Attachment"
        caption={route.params.taskDetails.attachment}
        avatar="https://img.icons8.com/ios-filled/512/000000/attach.png"
      />
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
    height: theme.SIZES.BASE * 4,
    justifyContent: "center",
    borderRadius: 70,
  },
  card: {
    color: "#ffffff",
    backgroundColor: "#c5e1a5",
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.75,
  },
});
