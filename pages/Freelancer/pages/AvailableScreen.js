import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Card } from "react-native-elements";
import ProgressBar from "react-native-progress/Bar";
import { AuthContext } from "../../Auth/Navigators/context";

fetchData = async (w) => {
  var response = await fetch("http://119.153.131.168:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const getJobsList = async (email) => {
    var params = [`email = \'${email}\'`];
    params = { table: 'EXTRA_DATA', item: 'category,id', arr: params };
    params = JSON.stringify(params);
    params = 'getlogin' + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return []; }
    var request_id = params[0].id;

    if (params.length == 0) { return []; }
    var task_type = params[0].category;

    params = [`category=\'${task_type}\' `, `freelancer_name=\'None\' AND id NOT IN (SELECT id FROM request WHERE request_id = ${request_id} )`];
    params = { table: 'details', item: '*', arr: params };
    params = JSON.stringify(params);
    params = 'gettask' + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return []; }
    return params

}


export const AvailableScreen = ({navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  const [taskList, setTaskList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getDetails = async () => {
    console.log(myEmail);
    setTaskList(await getJobsList(myEmail));
    // setTaskList([
    //   {name: 'Research',
    //   category:' Content Writing',
    //   status: 'Please write a 200 word essay on sexism in Pakistan. Before deadline',
    //   date: '2020-04-28',
    //   freelancer_name: myEmail,
    //   }
    // ])
    setIsLoading(false);
  }
  if(isLoading == true){getDetails();}
  

  if(isLoading == false){return (
        <ScrollView>
          <View>
            {taskList.map((task) => {
              return (
                <TouchableOpacity onPress = {() => {
                    navigation.navigate("ViewAvailable", {taskDetails: task})
                }}>
                  <Card title={task.name}>
                    <Text style = {{marginBottom: 10}}>
                      {task.status}
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      Deadline: {task.date.substring(0,10)}
                    </Text>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity onPress = {() => {getDetails()}}>
            <View style = {{alignItems: 'center', marginTop: 30, backgroundColor: 'silver', marginLeft: 150, marginRight: 150}}><Text>Refresh</Text></View>
          </TouchableOpacity>
        </ScrollView>
      );}
    else{
      return <View><Text>Loading</Text></View>
    }
};