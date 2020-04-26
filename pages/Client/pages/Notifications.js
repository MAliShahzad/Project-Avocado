import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { Block, Text, theme, Button, Icon, Card } from "galio-framework";
const { width, height } = Dimensions.get("screen");

const TaskAvailable = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          height: theme.SIZES.BASE * 4.9,
        }}
      >
        <Card
          flex
          borderless
          style={styles.card}
          title="New Tasks Availabe"
          caption="2 New Tasks"
          avatar="https://img.icons8.com/metro/96/000000/new.png"
        />
      </TouchableOpacity>
    </View>
  );
};

const TaskRequested = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          height: theme.SIZES.BASE * 4.9,
        }}
      >
        <Card
          flex
          borderless
          style={styles.card}
          title="New Task Request"
          caption="Socio Essay"
          avatar="https://img.icons8.com/ios-filled/96/000000/avocado.png"
        />
      </TouchableOpacity>
    </View>
  );
};

const TaskDeleted = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          height: theme.SIZES.BASE * 4.9,
        }}
      >
        <Card
          flex
          borderless
          style={styles.card}
          title="Task Deleted"
          caption="Socio Essay"
          avatar="https://img.icons8.com/windows/96/000000/trash.png"
        />
      </TouchableOpacity>
    </View>
  );
};

const TaskRated = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          height: theme.SIZES.BASE * 4.9,
        }}
      >
        <Card
          flex
          borderless
          style={styles.card}
          title="Task Rated"
          caption="Anthro Essay"
          avatar="https://img.icons8.com/ios-filled/96/000000/star.png"
        />
      </TouchableOpacity>
    </View>
  );
};

export const Notifications = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <TaskAvailable />
        <TaskDeleted />
        <TaskRated />
        <TaskRated />
        <TaskRated />
        <TaskRated />
        <TaskRequested />
        <TaskRequested />
        <TaskRequested />
        <TaskRequested />
        <TouchableOpacity
          style={styles.button}
          // onPress={() => {Clear Notifications}  }
        >
          <Text style={styles.buttonText}>Clear Notifications</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#558b2f",
    paddingHorizontal: 20,
    // justifyContent: "flex-start",
    paddingVertical: 50,
    width,
  },

  card: {
    color: "#ffffff",
    backgroundColor: "#f8ffd7",
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 2,
    height: 100,
    marginVertical: 10,
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: "#255d00",
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
