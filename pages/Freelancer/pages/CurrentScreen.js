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
  return await response;
};

const freelancerRejects = async (task_iden) => {
    var params = ["pending = \'Yes\', freelancer_name= \'None\' "];
    params = { table: "details", item: `id= ${task_iden}`, arr: params };
    params = JSON.stringify(params);
    params = "updtask" + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return ""; }

    params = [`id= ${task_iden}`];
    params = { table: "freelancer", arr: params };
    params = JSON.stringify(params);
    params = "deltask" + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return ""; }

    return "Done"


}

const getUserCurrentTasks = async (email) => {
    var params = ["login=\'" + email + "\'"];
    params = { table: 'U_SERS', item: 'id', arr: params };
    params = JSON.stringify(params);
    params = 'getlogin' + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return []; };
    let iden = params[0].id;
    let role = [`id=${iden}`];
    role = { table: 'roles', item: '*', arr: role };
    role = JSON.stringify(role);
    role = 'getlogin' + role;
    try {
        role = await fetchData(role);
    } catch (err) { console.log(err); return []; };
    role = role[0].name;

    if (role == 'customer') { role = "buyer"; var curr_tasks = [`id IN (SELECT id FROM ${role} WHERE user_id= ${iden} )`] }
    else {
        var curr_tasks = [`(PENDING=\'NO\' OR PENDING =\'Complete\') AND id IN (SELECT id FROM ${role} WHERE user_id= ${iden} )`];

    }
    curr_tasks = { table: 'details', item: '*', arr: curr_tasks };

    curr_tasks = JSON.stringify(curr_tasks);
    curr_tasks = 'gettask' + curr_tasks;
    try {
        curr_tasks = await fetchData(curr_tasks);
    } catch (err) { console.log(err); return []; };

    var query = 'getdate';
    try {
        query = await fetchData(query);
    } catch (err) { console.log(err); return ""; }
    query = query[0]



    var today_date = query['NOW()']

    curr_tasks.forEach(w => w.today = today_date)




    return curr_tasks

}

export const CurrentScreen = ({navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  const [taskList, setTaskList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const submitHandler = async (task_id)=> {
    var outcome = await freelancerRejects(task_id);
    if(outcome == 'Done'){
      alert('Removed');
      getDetails();
    }
  }

  const difference =  (dateone, datetwo) => {

  
    var y1 = parseInt(dateone.substring(0, 4), 10);
    var m1 = parseInt(dateone.substring(5, 7), 10);
    var d1 = parseInt(dateone.substring(8, 10), 10);


    var y2 = parseInt(datetwo.substring(0, 4), 10);
    var m2 = parseInt(datetwo.substring(5, 7), 10);
    var d2 = parseInt(datetwo.substring(8, 10), 10);


    m1 = (y1 - y2)*12 + m1;
    d1 = (m1 - m2)*30 + d1;

    return (d1 - d2);
  }

  const getDetails = async () => {
    console.log(myEmail);
    setTaskList(await getUserCurrentTasks(myEmail));
    setIsLoading(false);
    console.log(taskList)
  }
  if(isLoading == true){getDetails();}
  

  if(isLoading == false){return (
        <ScrollView>
          <View>
            {taskList.map((task) => {
              return (
                <TouchableOpacity onPress = {() => {
                  navigation.navigate("ViewTask", {taskDetails: task})
                }}>
                  <Card title={task.name}>
                    <Text style = {{marginBottom: 10}}>
                      {task.status}
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      Deadline: {task.date.substring(0,10)}
                    </Text>
                    <ProgressBar
                      color="red"
                      borderColor = "black"
                      borderRadius={20}
                      progress={difference(task.today, task.created_date)/difference(task.date, task.created_date)}
                      width={Dimensions.get("window").width - 40 - 10}
                      height={15}
                    />
                    <TouchableOpacity
                      onPress = {() => {submitHandler(task.id)}}>
                      <View style = {{backgroundColor: 'red',borderWidth: 1, marginTop: 10, alignItems: 'center'}}>
                        <Text style = {{textAlign: 'center', marginTop: 0, color: 'white'}}>DELETE</Text>
                      </View>
                    </TouchableOpacity>
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