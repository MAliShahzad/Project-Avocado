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
import { Card } from "react-native-elements";
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
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ViewRequest", { taskDetails: task });
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
                    <Text style={{ marginBottom: 10 }}>{task.status}</Text>
                    <Text style={{ fontWeight: "bold" }}>
                      Deadline: {task.date.substring(0, 10)}
                    </Text>
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
