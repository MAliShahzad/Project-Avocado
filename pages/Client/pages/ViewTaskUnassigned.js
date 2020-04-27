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
import { AuthContext } from "../../Auth/Navigators/context";

export const ViewTaskUnassigned = ({ route, navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  let short_status = route.params.taskDetails.status.substring(0, 50);
  if (route.params.taskDetails.status.length > 50)
    short_status = short_status + "...";
  const [isVisible, setIsVisible] = useState(false);
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
      <Card
        flex
        borderless
        captionColor="rgba(0,0,0,0.4)"
        style={styles.card}
        title="Attachment"
        caption={route.params.taskDetails.attachment}
        avatar="https://img.icons8.com/ios-filled/512/000000/attach.png"
      />

      <Card
        flex
        borderless
        captionColor="rgba(0,0,0,0.4)"
        style={styles.card}
        title="No Free Lancer Assigned"
        caption=""
        avatar="https://img.icons8.com/material-sharp/512/000000/user.png"
        onPress={() => {
          this.setState({ visible: true });
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("BrowseFreelancers", {
              category: route.params.taskDetails.category,
              id: route.params.taskDetails.id,
            })
          }
        >
          <Text style={styles.buttonText}>Browse Free Lancer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("ViewRequests", {
              id: route.params.taskDetails.id,
              isLoading: true,
            })
          }
        >
          <Text style={styles.buttonText}>View Requests</Text>
        </TouchableOpacity>
      </View>
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
  button: {
    width: width / 2.5,
    height: 50,
    marginHorizontal: 10,
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
  card: {
    color: "#ffffff",
    backgroundColor: "#c5e1a5",
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 2,
    height: 100,
    marginVertical: 10,
  },
});
