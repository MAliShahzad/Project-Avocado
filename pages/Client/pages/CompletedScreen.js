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

const getUserHistoryTasks = async (email) => {
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
  let hist_tasks = [`id= ${iden}`];
  hist_tasks = { table: "history", item: "task_id", arr: hist_tasks };
  console.log(hist_tasks);
  hist_tasks = JSON.stringify(hist_tasks);
  hist_tasks = "get" + role + hist_tasks;
  try {
    hist_tasks = await fetchData(hist_tasks);
  } catch (err) {
    console.log(err);
    return [];
  }

  if (hist_tasks.length == 0) {
    return [];
  }

  var idlist = [];
  hist_tasks.forEach((w) => idlist.push(w.task_id));

  let query = `id=${idlist[0]}`;
  for (let index = 1; index < idlist.length; index++) {
    query += ` OR id=${idlist[index]}`;
  }
  query = [query];

  query = { table: "details", item: "*", arr: query };
  query = JSON.stringify(query);
  query = "gettask" + query;
  try {
    query = await fetchData(query);
  } catch (err) {
    console.log(err);
    return [];
  }

  let rat = [`id= ${iden}`];
  rat = { table: "history", item: "task_id,ratings", arr: rat };
  console.log(rat);
  rat = JSON.stringify(rat);
  rat = "get" + role + rat;
  try {
    rat = await fetchData(rat);
  } catch (err) {
    console.log(err);
    return [];
  }

  if (rat.length == 0) {
    return [];
  }
  query.forEach((w) => (w.rating = 0));

  query.forEach((w) => {
    for (let index = 0; index < rat.length; index++) {
      if (rat[index].task_id == w.id) {
        console.log("BRAVO");
        w.rating = rat[index].ratings;
      }
    }
  });

  return query;
};

export const CompletedScreen = ({ navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  const [taskList, setTaskList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getDetails = async () => {
    console.log(myEmail);
    setTaskList(await getUserHistoryTasks(myEmail));
    console.log(taskList);
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
                  navigation.navigate("CompletedTask", { taskDetails: task });
                }}
              >
                <Card title={task.name}>
                  <Text style={{ marginBottom: 10 }}>{task.status}</Text>
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
