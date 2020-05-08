import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { Card, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import ProgressBar from "react-native-progress/Bar";
import { AuthContext } from "../../Auth/Navigators/context";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { EmptyScreen } from "../../../components/EmptyScreen";
fetchData = async (w) => {
  var response = await fetch("http://182.176.112.68:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const customerDeleteTask = async (task_id) => {
  var params = [`id = ${task_id}`];
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

  let freelancer_iden = 0;
  params = [`id = ${task_id}`];
  params = { table: "freelancer", item: "user_id", arr: params };
  params = JSON.stringify(params);
  params = "gettask" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }
  try {
    let freelancer_iden = params[0].user_id;
  } catch {
    let freelancer_iden = 0;
  }

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

  if (freelancer_iden != 0) {
    params = [
      freelancer_iden,
      "Task Deleted",
      `${task_name} has been deleted and discontinued by ${customer_name}`,
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
  }

  params = [`id= ${task_id}`];
  params = { table: "freelancer", arr: params };
  params = JSON.stringify(params);
  params = "deltask" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
  }

  params = [`id= ${task_id}`];
  params = { table: "files", arr: params };
  params = JSON.stringify(params);
  params = "deltask" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
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

  params = [`id= ${task_id}`];
  params = { table: "details", arr: params };
  params = JSON.stringify(params);
  params = "deltask" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  params = [`id= ${task_id}`];
  params = { table: "request", arr: params };
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

const getProgress = async (task_iden) => {
  var params = task_iden;
  params = JSON.stringify(params);
  params = "progress" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }
  params = params[0];

  var query = "getdate";
  try {
    query = await fetchData(query);
  } catch (err) {
    console.log(err);
    return "";
  }
  query = query[0];

  today_date = query["NOW()"].substring(0, 10);

  create_date = params.created_date.substring(0, 10);

  due_date = params.date.substring(0, 10);

  return { today: today_date, created: create_date, due: due_date };
};

const getUserCurrentTasks = async (email) => {
  var params = ["login='" + email + "'"];
  params = { table: "U_SERS", item: "id", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return [];
  }
  let iden = params[0].id;
  let role = [`id=${iden}`];
  role = { table: "roles", item: "*", arr: role };
  role = JSON.stringify(role);
  role = "getlogin" + role;
  try {
    role = await fetchData(role);
  } catch (err) {
    console.log(err);
    return [];
  }
  role = role[0].name;
  if (role == "customer") {
    role = "buyer";
    curr_tasks = [`id IN (SELECT id FROM ${role} WHERE user_id= ${iden} )`];
  } else {
    let curr_tasks = [
      `id IN (SELECT id FROM ${role} WHERE user_id= ${iden} ) AND (pending = \'No\' OR pending=\'Complete\')`,
    ];
  }
  var curr_tasks = { table: "details", item: "*", arr: curr_tasks };
  curr_tasks = JSON.stringify(curr_tasks);
  curr_tasks = "gettask" + curr_tasks;
  try {
    curr_tasks = await fetchData(curr_tasks);
  } catch (err) {
    console.log(err);
    return [];
  }

  var query = "getdate";
  try {
    query = await fetchData(query);
  } catch (err) {
    console.log(err);
    return "";
  }
  query = query[0];

  var today_date = query["NOW()"];

  curr_tasks.forEach((w) => (w.today = today_date));

  return curr_tasks;
};

export const CurrentScreen = ({ navigation }) => {
  //////////////////////////////////

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(3000).then(() => setRefreshing(false));
  }, [refreshing]);

  ///////////////////////////////////

  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  const [taskList, setTaskList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(null);

  const difference = (dateone, datetwo) => {
    var y1 = parseInt(dateone.substring(0, 4), 10);
    var m1 = parseInt(dateone.substring(5, 7), 10);
    var d1 = parseInt(dateone.substring(8, 10), 10);

    var y2 = parseInt(datetwo.substring(0, 4), 10);
    var m2 = parseInt(datetwo.substring(5, 7), 10);
    var d2 = parseInt(datetwo.substring(8, 10), 10);

    m1 = (y1 - y2) * 12 + m1;
    d1 = (m1 - m2) * 30 + d1;

    return d1 - d2;
  };

  const submitHandler = async (task_id) => {
    console.log(task_id);
    var outcome = await customerDeleteTask(task_id);
    if (outcome == "Done") {
      alert("Task deleted");
      getDetails();
    }
  };

  const getDetails = async () => {
    console.log(myEmail);
    setTaskList(await getUserCurrentTasks(myEmail));
    // setTaskList([
    //   {name: 'Research', status: 'Animal photography', id: 12, category: 'Photo Editing', date: '2020-10-12', freelancer_name: 'Shayan', pending: 'No'},
    //   {name: 'Writing', id: 12, status: 'Descriptive Writing', category: 'Photo Editing', date: '2020-10-12', freelancer_name: 'None', pending: 'No'}
    // ])
    console.log(taskList);
    setIsLoading(false);
  };
  if (isLoading == true) {
    getDetails();
  }
  if (taskList.length == 0 && isLoading == false) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getDetails} />
        }
      >
        <EmptyScreen></EmptyScreen>
      </ScrollView>
    );
  }
  if (isLoading == false) {
    return (
      <SafeAreaView style={styles.container1}>
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getDetails} />
          }
        >
          <View style={{ paddingBottom: 20 }}>
            {taskList.map((task) => {
              if (difference(task.date, task.created_date) == 0) {
                var progressVal = 1;
              } else {
                var progressVal =
                  difference(task.today, task.created_date) /
                  difference(task.date, task.created_date);
              }
              let short_status = task.status.substring(0, 60);
              if (task.status.length > 60) short_status = short_status + "...";
              if (task.pending != "Complete") {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (task.freelancer_name == "None") {
                        navigation.navigate("ViewTaskUnassigned", {
                          taskDetails: task,
                        });
                      } else {
                        navigation.navigate("ViewTask", { taskDetails: task });
                      }
                    }}
                  >
                    <Card
                      title={task.name}
                      titleStyle={{
                        fontSize: 20,
                        // color: "white",
                      }}
                      containerStyle={{
                        borderRadius: 15,
                        backgroundColor: "#c5e1a5",
                        borderWidth: 0,
                      }}
                      dividerStyle={{
                        backgroundColor: "black",
                      }}
                      wrapperStyle={{
                        backgroundColor: "#c5e1a5",
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 2,
                            backgroundColor: "green",
                            borderRadius: 10,
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              color: "white",
                            }}
                          >
                            {task.category}
                          </Text>
                        </View>
                      </View>
                      <Text style={{ marginVertical: 10, color: "black" }}>
                        {short_status}
                      </Text>
                      <Text style={{ fontWeight: "bold" }}>
                        DEADLINE: {task.date.substring(0, 10)}
                      </Text>
                      <View
                        style={{
                          alignItems: "center",
                          marginVertical: 10,
                        }}
                      >
                        <ProgressBar
                          color="#524c00"
                          borderRadius={20}
                          progress={progressVal}
                          width={Dimensions.get("window").width - 40 - 10}
                          height={15}
                        />
                      </View>
                      <View
                        style={{
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                        }}
                      >
                        <Button
                          onPress={() => submitHandler(task.id)}
                          icon={<Icon name="trash" size={20} color="grey" />}
                          title=""
                          type="clear"
                        />
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (task.freelancer_name == "None") {
                        navigation.navigate("ViewTaskUnassigned", {
                          taskDetails: task,
                        });
                      } else {
                        navigation.navigate("ViewTask", { taskDetails: task });
                      }
                    }}
                  >
                    <Card
                      title={task.name}
                      titleStyle={{
                        fontSize: 20,
                        // color: "white",
                      }}
                      containerStyle={{
                        borderRadius: 15,
                        backgroundColor: "#c5e1a5",
                        borderWidth: 0,
                      }}
                      dividerStyle={{
                        backgroundColor: "black",
                      }}
                      wrapperStyle={{
                        backgroundColor: "#c5e1a5",
                      }}
                    >
                      <Text style={{ marginBottom: 10 }}>{short_status}</Text>
                      <Text
                        style={{
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "green",
                        }}
                      >
                        Task Completed. Click to rate freelancer.
                      </Text>
                    </Card>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
          {/* <TouchableOpacity
          onPress={() => {
            getDetails();
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginTop: 30,
              backgroundColor: "silver",
              marginLeft: 150,
              marginRight: 150,
            }}
          >
            <Text>Raefresh</Text>
          </View>
        </TouchableOpacity> */}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return <LoadingScreen></LoadingScreen>;
  }
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
    // paddingVertical: 100,
    // paddingBottom: 300,
  },
  container1: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  container2: {
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
    paddingBottom: 300,
  },
});
