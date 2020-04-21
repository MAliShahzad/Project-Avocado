import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Alert,
  Dimensions,
  ScrollView,
  Picker,
  TouchableOpacity
} from "react-native";
import DatePicker from 'react-native-datepicker'
import { AuthContext } from "../../Auth/Navigators/context";

fetchData = async (w) => {
  var response = await fetch("http://119.153.131.168:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const InsertTask = async (email, task_name, task_info, task_category, due_date) => {
    var iden = 0
    if (task_info.length < task_name.length) { return "no description" }
    for (let index = 0; index < task_name.length; index++) {
        var num = task_name.charCodeAt(index);
        iden += task_info.charCodeAt(index);
        iden += Math.pow(num, 2);
    }
    var params = [iden, task_name, task_info, task_category, "Yes", "None", "", due_date];
    params = JSON.stringify(params);
    params = 'insertdetail' + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return ""; }


    params = ["login=\'" + email + "\'"];
    params = { table: 'U_SERS', item: 'id', arr: params };
    params = JSON.stringify(params);
    params = 'getlogin' + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return ""; }
    let user_iden = params[0].id;

    params = [iden, user_iden];
    params = JSON.stringify(params);
    params = 'insertbuyer' + params;
    try {
        params = await fetchData(params);
    } catch (err) { console.log(err); return ""; }

    return "Done"

}

export const NewTask = ({navigation}) => {
  const { getEmail } = React.useContext(AuthContext);
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [addAttachment, setAddAttachment] = useState("");
  const [deadline, setDeadline] = useState("");
  const [msg, setmsg] = useState("Done")
  const myEmail = getEmail();
  const submitHandler = async () => {
    console.log(myEmail, title, description, category, deadline.substring(0,4) + deadline.substring(5,7) + deadline.substring(8,10))
    //receive message of 'Valid' from db
    setmsg(await InsertTask(myEmail, title, description, category, deadline.substring(0,4) + deadline.substring(5,7) + deadline.substring(8,10)));
    if(msg == 'Done'){
      Alert.alert(
                  "Congratulations",
                  "A new task has been added.",
                  [{ text: "OK", onPress: () => console.log('OK Pressed') }],
                  { cancelable: false }
      );
   }
   else{
    Alert.alert(
                  "Error",
                  "Some of the details are invalid.",
                  [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                  { cancelable: false }
      );
   }
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Add title"
          onChangeText={(val) => settitle(val)}
        />
        <Text>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Add description"
          onChangeText={(val) => setdescription(val)}
        />
        <Text>Category</Text>
        <View style= {{margin: 10, justifyContent: 'center', marginLeft: 17, borderWidth: 1, height: 40}}>
          <Picker
            style = {{marginLeft: 78, marginRight: 78,transform: [{ scaleX: 0.85 }, { scaleY: 0.85 },]}}
            selectedValue = {category}
            onValueChange = {(itemValue, itemIndex) => setcategory(itemValue)}>
            <Picker.Item label="Select" value = ""/>
            <Picker.Item label="Content Writing" value = "Content Writing"/>
            <Picker.Item label="Program Development" value = "Program Development"/>
            <Picker.Item label="Photography" value = "Photography"/>
            <Picker.Item label="Photo Editing" value = "Photo Editing"/>
            <Picker.Item label="Video Editing" value = "Video Editing"/>
          </Picker>
        </View>
        <Text>Deadline</Text>
        <DatePicker
          style ={{padding:8, margin: 10, width: 360}}
          date = {deadline}
          mode = "date"
          placeholder = "Select Date"
          showIcon = {false}
           
          onDateChange={(date) => {setDeadline(date)}}
        />
        {/*<Text>{deadline.substring(0,4) + deadline.substring(5,7) + deadline.substring(8,10)}</Text>*/}
        <View style={{ padding: 10 }}>
          <Button
            title="Submit"
            color="green"
            onPress={() => {
              if(title == "" || deadline == "" || description == "" || category == ""){
                alert("One or more fields have been left empty.")
              }
              else{submitHandler()}
              //navigation.pop();
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 5.5,
    margin: 10,
    marginLeft: 17,
    textAlign: 'center'
  },
});
