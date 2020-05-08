import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Picker,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { AuthContext } from "../../Auth/Navigators/context";
const { width, height } = Dimensions.get("screen");
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

// import {
//   DocumentPicker,
//   DocumentPickerUtil,
// } from "react-native-document-picker";
fetchData = async (w) => {
  var response = await fetch("http://182.176.112.68:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const InsertTask = async (
  email,
  task_name,
  task_info,
  task_category,
  file,
  filename,
  due_date,
  temp
) => {
  var iden = 0;
  var pem = "";
  if (task_info.length < task_name.length) {
    pem = task_info;
  } else {
    pem = task_name;
  }
  for (let index = 0; index < pem.length; index++) {
    var num = task_name.charCodeAt(index);
    iden += task_info.charCodeAt(index);
    iden += Math.pow(num, 2);
    iden += temp;
  }
  iden = iden % (Math.random() * (2, 147, 483, 640 - 500000) + 500000);
  iden = parseInt(iden);
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

  try {
    var response = await fetch("http://182.176.112.68:3000/sendtaskfile", {
      // Your POST endpoint
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({ data: file, iden: iden, fname: filename }), // This is your file object
    });
  } catch (err) {
    console.log(err);
    return;
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
  const [img, setimg] = useState("");
  const [fn, setfn] = useState("");
  const [temp, settemp] = useState(0);

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    console.log(result);
    var resp = "";
    resp = await FileSystem.readAsStringAsync(result.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log(resp.length);
    setfn(result.name);
    setimg(resp);
  };

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
    Alert.alert(
      "Uploading",
      "Uploading your file.",
      [{ text: "cancel upload", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
    setmsg(
      await InsertTask(
        myEmail,
        title,
        description,
        category,
        img,
        fn,
        deadline.substring(0, 4) +
          deadline.substring(5, 7) +
          deadline.substring(8, 10) +
          "060000",
        temp
      )
    );
    if (msg == "Done") {
      settemp(temp + 1);
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
        <Text style={styles.labels}>Add Task Title</Text>
        <TextInput
          placeholderTextColor="rgba(0,0,0,0.6)"
          underlineColorAndroid="rgba(0,0,0,0)"
          style={styles.inputBox}
          placeholder="Title"
          onChangeText={(val) => settitle(val)}
        />
        <Text style={styles.labels}>Add Task Description</Text>
        <TextInput
          placeholderTextColor="rgba(0,0,0,0.6)"
          underlineColorAndroid="rgba(0,0,0,0)"
          style={styles.inputBox}
          placeholder="Description"
          onChangeText={(val) => setdescription(val)}
        />
        <Text style={styles.labels}>Select Task Category</Text>
        <TouchableOpacity style={styles.boxStyle} disabled={true}>
          <TouchableOpacity
            style={{ width: width - width / 5 }}
            disabled={true}
          >
            <Picker
              style={{
                color: "rgba(0,0,0,0.6)",
                textAlign: "center",
              }}
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setcategory(itemValue)}
            >
              <Picker.Item
                style={{ color: "#fffff" }}
                label="Category"
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
          <View style={{ alignItems: "center" }}>
            <Text style={styles.labels}>Pick Task Deadline</Text>

            <TouchableOpacity style={styles.dateStyle} disabled={true}>
              <DatePicker
                style={{ width: width - width / 1.7 - 20 }}
                date={deadline}
                mode="date"
                placeholder="Deadline"
                showIcon={false}
                onDateChange={(date) => {
                  setDeadline(date);
                }}
                customStyles={{
                  dateInput: { borderWidth: 0 },
                  placeholderText: {
                    fontSize: 15,
                    color: "rgba(0,0,0,0.6)",
                  },
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.labels}>Add Attachment</Text>

            <TouchableOpacity
              style={styles.dateStyle}
              onPress={() => _pickDocument()}
            >
              <Text style={styles.attachText}>Attachment</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Image source={{ uri: img }} style={{ width: 200, height: 200 }} /> */}
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
    backgroundColor: "white",
    padding: 20,
  },
  boxStyle: {
    width: width - width / 8,
    height: 55,
    backgroundColor: "#dcedc8",
    marginVertical: height / 60,
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
    backgroundColor: "#dcedc8",
    marginVertical: height / 60,
    borderRadius: 50,
    paddingHorizontal: 10,
    justifyContent: "center",
    // color: "#ffffff",
  },
  inputBox: {
    marginVertical: height / 60,
    width: width - width / 8,
    height: 55,
    backgroundColor: "#dcedc8",
    borderRadius: 50,
    paddingHorizontal: 28,
    color: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    // textAlign: "center",
    fontSize: width / 30,
  },
  button: {
    width: width / 1.7,
    height: 55,
    backgroundColor: "#7da453",
    marginVertical: 10,
    borderRadius: 50,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: width / 30,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  attachText: {
    fontSize: width / 30,
    fontWeight: "100",
    color: "rgba(0,0,0,0.6)",
    textAlign: "center",
  },
  labels: {
    // marginVertical: height / 60,
    // marginTop: height / 60,
    color: "rgba(0,0,0,0.4)",
    fontSize: width / 35,
    fontFamily: "Roboto",
    // fontWeight: "bold",
  },
});
