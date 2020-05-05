import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { Block, Text, theme, Button, Icon, Card } from "galio-framework";
const { width, height } = Dimensions.get("screen");
import { AuthContext } from "../../Auth/Navigators/context";
import { LoadingScreen } from "../../../components/LoadingScreen";
const getNotifications = async (email) => {
  var params = ["email='" + email + "'"];
  params = { table: "EXTRA_DATA", item: "*", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return params;
  }

  var iden = params[0].id;

  var params = [`id= ${iden} ORDER BY created_date DESC`];
  params = { table: "notifications", item: "*", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return params;
  }

  return params;
};

const NotificationCard = ({ navigation, types, details }) => {
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
          title={types}
          caption={details}
          avatar="https://img.icons8.com/material-sharp/24/000000/bell.png"
        />
      </TouchableOpacity>
    </View>
  );
};

export const Notifications = ({ navigation }) => {
  ////////////////////// Mustafa's Edit /////////////
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(3000).then(() => setRefreshing(false));
  }, [refreshing]);
  ///////////////////////////////////////////////////

  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  const [isLoading, setIsLoading] = React.useState(true);
  const [taskList, setTaskList] = React.useState([]);
  const getDetails = async () => {
    console.log(myEmail);
    setTaskList(await getNotifications(myEmail));
    console.log(taskList);
    setIsLoading(false);
  };
  if (isLoading == true) {
    getDetails();
  }
  if (isLoading == false) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getDetails} />
          }
        >
          <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
              {taskList.map((task) => (
                <NotificationCard types={task.types} details={task.details} />
              ))}
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Clear Notifications</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return <LoadingScreen></LoadingScreen>;
  }
};
const styles = StyleSheet.create({
  container: {
    //flexGrow: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    // justifyContent: "flex-start",
    paddingVertical: 30,
    width,
  },

  card: {
    color: "#ffffff",
    backgroundColor: "#c5e1a5",
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 2,
    height: 100,
    marginVertical: 10,
    borderRadius: 0,
  },
  button: {
    width: 300,
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
