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
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { AuthContext } from "../../Auth/Navigators/context";
const { width, height } = Dimensions.get("screen");

fetchData = async (w) => {
  var response = await fetch("http://39.46.200.250:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const InsertTask = async (
  email,
  task_name,
  task_info,
  task_category,
  due_date
) => {
  var iden = 0;
  if (task_info.length < task_name.length) {
    return "no description";
  }
  for (let index = 0; index < task_name.length; index++) {
    var num = task_name.charCodeAt(index);
    iden += task_info.charCodeAt(index);
    iden += Math.pow(num, 2);
  }
  var params = [
    iden,
    task_name,
    task_info,
    task_category,
    "Yes",
    "None",
    "",
    due_date,
  ];
  params = JSON.stringify(params);
  params = "insertdetail" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  params = ["login='" + email + "'"];
  params = { table: "U_SERS", item: "id", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }
  let user_iden = params[0].id;

  params = [iden, user_iden];
  params = JSON.stringify(params);
  params = "insertbuyer" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }

  return "Done";
};

export const NewTask = ({ navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [addAttachment, setAddAttachment] = useState("");
  const [deadline, setDeadline] = useState("");
  const [msg, setmsg] = useState("Done");
  const myEmail = getEmail();
  const submitHandler = async () => {
    console.log(
      myEmail,
      title,
      description,
      category,
      deadline.substring(0, 4) +
        deadline.substring(5, 7) +
        deadline.substring(8, 10)
    );
    //receive message of 'Valid' from db
    setmsg(
      await InsertTask(
        myEmail,
        title,
        description,
        category,
        deadline.substring(0, 4) +
          deadline.substring(5, 7) +
          deadline.substring(8, 10)
      )
    );
    if (msg == "Done") {
      Alert.alert(
        "Congratulations",
        "A new task has been added.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Error",
        "Some of the details are invalid.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <TextInput
          placeholderTextColor="rgba(0,0,0,0.3)"
          underlineColorAndroid="rgba(0,0,0,0)"
          style={styles.inputBox}
          placeholder="Add a Title"
          onChangeText={(val) => settitle(val)}
        />
        <TextInput
          placeholderTextColor="rgba(0,0,0,0.3)"
          underlineColorAndroid="rgba(0,0,0,0)"
          style={styles.inputBox}
          placeholder="Add a Description"
          onChangeText={(val) => setdescription(val)}
        />
        <TouchableOpacity style={styles.boxStyle} disabled={true}>
          <TouchableOpacity
            style={{ width: width - width / 5 }}
            disabled={true}
          >
            <Picker
              style={{
                color: "#ffffff",
                textAlign: "center",
              }}
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setcategory(itemValue)}
            >
              <Picker.Item
                style={{ color: "#fffff" }}
                label="Select a Category"
                value=""
              />
              <Picker.Item label="Content Writing" value="Content Writing" />
              <Picker.Item
                label="Program Development"
                value="Program Development"
              />
              <Picker.Item label="Photography" value="Photography" />
              <Picker.Item label="Photo Editing" value="Photo Editing" />
              <Picker.Item label="Video Editing" value="Video Editing" />
            </Picker>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.dateStyle} disabled={true}>
            <DatePicker
              style={{ width: width - width / 1.7 - 20 }}
              date={deadline}
              mode="date"
              placeholder="Pick a Deadline"
              showIcon={false}
              onDateChange={(date) => {
                setDeadline(date);
              }}
              customStyles={{
                dateInput: { borderWidth: 0 },
                placeholderText: {
                  fontSize: 15,
                  color: "white",
                },
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateStyle}>
            <Text style={styles.attachText}>Add an Attachment</Text>
          </TouchableOpacity>
        </View>
        {/*<Text>{deadline.substring(0,4) + deadline.substring(5,7) + deadline.substring(8,10)}</Text>*/}
        <View style={{ padding: 10, marginBottom: 10 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (
                title == "" ||
                deadline == "" ||
                description == "" ||
                category == ""
              ) {
                alert("One or more fields have been left empty.");
              } else {
                submitHandler();
              }
              //navigation.pop();
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#689f38",
    padding: 20,
  },
  boxStyle: {
    width: width - width / 8,
    height: 55,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginVertical: 10,
    borderRadius: 50,
    paddingHorizontal: 1,
    justifyContent: "center",
    alignItems: "center",
    // color: "#ffffff",
  },
  dateStyle: {
    width: width - width / 1.7,
    marginHorizontal: 10,
    height: 55,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginVertical: 10,
    borderRadius: 50,
    paddingHorizontal: 10,
    justifyContent: "center",
    // color: "#ffffff",
  },
  inputBox: {
    marginVertical: 10,
    width: width - width / 8,
    height: 55,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 50,
    paddingHorizontal: 28,
    color: "#ffffff",
    justifyContent: "center",
    // textAlign: "center",
    fontSize: 14,
  },
  button: {
    width: 300,
    height: 55,
    backgroundColor: "#387002",
    marginVertical: 10,
    borderRadius: 50,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  attachText: {
    fontSize: 14,
    fontWeight: "100",
    color: "white",
    textAlign: "center",
  },
});
