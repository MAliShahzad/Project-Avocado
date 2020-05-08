import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Button,
  Alert,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../Auth/Navigators/context";
import { LoadingScreen } from "../../../components/LoadingScreen";

fetchData = async (w) => {
  var response = await fetch("http://182.176.112.68:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const updateFreelancer = async (customer_email, task_id, freelancer_email) => {
  var params = ["email='" + customer_email + "'"];
  params = { table: "EXTRA_DATA", item: "id,user_name", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }
  let user_iden = params[0].id;
  let user_name = params[0].user_name;

  params = [`email =\'${freelancer_email}\'`];
  params = { table: "EXTRA_DATA", item: "id,user_name", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return "";
  }
  let freelancer_iden = params[0].id;
  let freelancer_name = params[0].user_name;

  var item = `id = \'${task_id}\' `;
  params = {
    table: "details",
    item: item,
    arr: [
      `freelancer_name = \'${freelancer_name}\', freelancer_email=\'${freelancer_email}\'`,
    ],
  };
  params = JSON.stringify(params);
  params = "updTask" + params;
  try {
    params = await fetchData(params);
  } catch {
    console.log(err);
    return "";
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

  params = [
    freelancer_iden,
    "Task Request",
    `${user_name} has requested for you to work on ${task_name}`,
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

  params = [task_id, freelancer_iden];
  params = JSON.stringify(params);
  params = "insertfreelancer" + params;
  try {
    params = await fetchData(params);
  } catch {
    console.log(err);
    return "";
  }

  return "Done";
};

//import { Card } from "react-native-elements";

const CustomButton = (props) => {
  const { title = "Enter", style = {}, textStyle = {}, onPress, color } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const getImg = async (email) => {
  var params = ["email='" + email + "'"];
  params = { table: "EXTRA_DATA", item: "*", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return params;
  }

  var iden = params[0].id;
  var imger = await fetch(
    "http://182.176.112.68:3000/getimage" + JSON.stringify({ id: iden })
  );
  imger = await imger.json();
  return imger;
};

export const ClientViewsFreelancer = ({ route, navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  const [isloading, setloading] = React.useState(true);
  const [imger, setimger] = React.useState("");
  const submitHandler = async () => {
    var outcome = await updateFreelancer(
      myEmail,
      route.params.task_id,
      route.params.email
    );
    if (outcome == "Done") {
      alert("Request sent to freelancer");
      navigation.pop();
    }
  };
  const getter = async () => {
    setimger(await getImg(route.params.email));
    setloading(false);
  };
  if (isloading == true) {
    getter(route.params.email);
    return <LoadingScreen></LoadingScreen>;
  }
  return (
    // <View style={styles.container}>
    //   <View style={styles.imageContainer}>
    //     <Image
    //       style={{ flex: 1, width: undefined, height: undefined }}
    //       source={require("../../../images/sabeehRehman.jpeg")}
    //     />
    //   </View>
    //   <View style={styles.buttonAndText}>
    //     <View style={styles.textContainer}>
    //       <Text style={styles.bigText}>{route.params.name}</Text>
    //       <Text>{route.params.email}</Text>
    //     </View>
    //   </View>
    //   <View style={styles.lowerPortion}>
    //     <View style={{ padding: 20 }}>
    //       <Text>Who am I?</Text>
    //       <Text>{route.params.about_me}</Text>
    //     </View>
    //   </View>
    //   <TouchableOpacity style={styles.button} onPress={() => submitHandler()}>
    //     <Text style={styles.buttonText}>Request</Text>
    //   </TouchableOpacity>
    // </View>
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="cover"
            // style={styles.canvas}
            style={{ flex: 1, width: undefined, height: undefined }}
            source={{ uri: "data:image/png;base64," + imger }}
          />
        </View>
        <View style={styles.buttonAndText}>
          <View style={styles.textContainer}>
            <Text style={styles.bigText}>{route.params.name}</Text>
            <Text style={styles.bigText2}>Freelancer</Text>
            <Text>{route.params.email}</Text>
          </View>
        </View>
        <View style={styles.lowerPortion}>
          <View style={styles.lowerPortion1}>
            <View style={{ paddingBottom: 20 }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20,
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Who am I?
                </Text>
              </View>

              <Text>{route.params.about_me}</Text>
            </View>

            <View style={{ height: 20 }}></View>
          </View>

          <CustomButton
            title="Request"
            style={{ backgroundColor: "#8B7136", margin: 20 }}
            onPress={() => submitHandler()}
          />
        </View>

        {/* <TouchableOpacity
  onPress={() => {
    getDetails();
  }}
>
  <View
    style={{
      alignItems: "center",
      marginBottom: 40,
      backgroundColor: "silver",
      marginLeft: 150,
      marginRight: 150,
      width: 80,
    }}
  >
    <Text>Refresh</Text>
  </View>
</TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    height: 200,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  imageContainer: {
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    height: 400,
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  bigText2: {
    fontWeight: "bold",
    fontSize: 15,
  },
  textContainer: {
    padding: 20,
    flex: 2,
  },
  buttonAndText: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  buttonDiv: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  lowerPortion: {
    paddingHorizontal: 20,
    backgroundColor: "white",
    // flex: 1,
    height: 400,
    // alignItems: "center",
    // justifyContent: "center",
    width: Dimensions.get("window").width,
    borderColor: "white",
    borderWidth: 1,
  },
  lowerPortion1: {
    padding: 10,
    backgroundColor: "white",
    // flex: 1,
    //height: 400,
    // alignItems: "center",
    // justifyContent: "center",
    borderColor: "white",
    borderWidth: 1,
    elevation: 2, // Android
    borderRadius: 20,
  },

  name: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ex: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").heigth,
  },
  textstyle: {
    width: Dimensions.get("window").width,
    padding: 20,
  },
  button: {
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    //backgroundColor: "#98C739",
    elevation: 8, // Android
    height: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  text: {
    fontSize: 10,
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
  container1: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    // flex: 1,
    // backgroundColor: "pink",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
