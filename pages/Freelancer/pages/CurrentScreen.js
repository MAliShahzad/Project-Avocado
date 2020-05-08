import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
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
  return await response;
};
const freelancerDeletes = async (task_iden) => {
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
    `${task_name} has been deleted and discontinued by ${freelancer_name}`,
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

  params = [freelancer_iden, task_iden, 0];
  params = JSON.stringify(params);
  params = "insertfhistory" + params;
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
    var curr_tasks = [`id IN (SELECT id FROM ${role} WHERE user_id= ${iden} )`];
  } else {
    var curr_tasks = [
      `(PENDING=\'NO\' OR PENDING =\'Complete\') AND id IN (SELECT id FROM ${role} WHERE user_id= ${iden} )`,
    ];
  }
  curr_tasks = { table: "details", item: "*", arr: curr_tasks };

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
  ////////////////////// Mustafa's Edit /////////////
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(3000).then(() => setRefreshing(false));
  }, [refreshing]);
  ///////////////////////////////////////////////////

  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  const [taskList, setTaskList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const submitHandler = async (task_id) => {
    var outcome = await freelancerDeletes(task_id);
    if (outcome == "Done") {
      alert("Removed");
      getDetails();
    }
  };

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

  const getDetails = async () => {
    console.log(myEmail);
    setTaskList(await getUserCurrentTasks(myEmail));
    setIsLoading(false);
    console.log(taskList);
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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getDetails} />
          }
        >
          <View>
            {taskList.map((task) => {
              let short_status = task.status.substring(0, 60);
              if (task.status.length > 60) short_status = short_status + "...";
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ViewTask", { taskDetails: task });
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
                    <Text style={{ fontWeight: "bold" }}>
                      Deadline: {task.date.substring(0, 10)}
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
                        progress={
                          difference(task.today, task.created_date) /
                          difference(task.date, task.created_date)
                        }
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
              <Text>Refresh</Text>
            </View>
          </TouchableOpacity> */}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return <LoadingScreen></LoadingScreen>;
  }
};
