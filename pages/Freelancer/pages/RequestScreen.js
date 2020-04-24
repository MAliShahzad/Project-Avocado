import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";
import ProgressBar from "react-native-progress/Bar";
import { AuthContext } from "../../Auth/Navigators/context";

fetchData = async (w) => {
  var response = await fetch("http://39.46.200.250:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const getMyPendingTasks = async (email) => {
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
  }
  let curr_tasks = [
    `id IN (SELECT id FROM ${role} WHERE user_id= ${iden} ) AND (pending=\'Yes\' OR pending=\'Requested\')`,
  ];
  curr_tasks = { table: "details", item: "*", arr: curr_tasks };
  curr_tasks = JSON.stringify(curr_tasks);
  curr_tasks = "gettask" + curr_tasks;
  try {
    curr_tasks = await fetchData(curr_tasks);
  } catch (err) {
    console.log(err);
    return [];
  }
  return curr_tasks;
};

export const RequestScreen = ({ navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  const [taskList, setTaskList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getDetails = async () => {
    console.log(myEmail);
    setTaskList(await getMyPendingTasks(myEmail));
    // setTaskList([
    //   {name: 'Research',
    //   category:' Content Writing',
    //   status: 'Please write a 200 word essay on sexism in Pakistan. Before deadline',
    //   date: '2020-04-28',
    //   freelancer_name: myEmail,
    //   }
    // ])
    setIsLoading(false);
  };
  if (isLoading == true) {
    getDetails();
  }

  if (isLoading == false) {
    return (
      <ScrollView>
        <View>
          {taskList.map((task) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ViewRequest", { taskDetails: task });
                }}
              >
                <Card title={task.name}>
                  <Text style={{ marginBottom: 10 }}>{task.status}</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    Deadline: {task.date.substring(0, 10)}
                  </Text>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
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
        </TouchableOpacity>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
};
