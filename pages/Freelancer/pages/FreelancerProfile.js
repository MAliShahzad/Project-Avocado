import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Button,
  Alert,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StatusBar,
} from "react-native";
import { AuthContext } from "../../Auth/Navigators/context";
import Constants from "expo-constants";
import * as DocumentPicker from "expo-document-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { LoadingScreen } from "../../../components/LoadingScreen";
fetchData = async (w) => {
  console.log("");
  var response = await fetch("http://182.176.112.68:3000/" + w);
  response = await response.json();
  console.log(response);
  return await response;
};

const getMyDetails = async (email) => {
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
  if (params.length == 0) {
    return [];
  }
  var iden = params[0].id;
  var roles = [`id=${iden}`];

  console.log("wait");
  var imger = await fetch(
    "http://182.176.112.68:3000/getimage" + JSON.stringify({ id: iden })
  );
  imger = await imger.json();

  roles = { table: "roles", item: "name", arr: roles };
  roles = JSON.stringify(roles);
  roles = "getlogin" + roles;
  try {
    roles = await fetchData(roles);
  } catch (err) {
    console.log(err);
    return params;
  }

  params = params[0];
  params.imger = imger;
  console.log("some");

  roles = roles[0].name;

  if (roles == "buyer") {
    roles = "customer";
  }

  var query = [`id= ${iden}`];
  query = { table: "ratings", item: "*", arr: query };
  query = JSON.stringify(query);
  query = "get" + roles + query;

  try {
    query = await fetchData(query);
  } catch (err) {
    console.log(err);
    return params;
  }
  params.ratings = 0;
  if (query.length == 0) {
    return params;
  }
  query = query[0].ratings;

  params.ratings = query;

  return params;
};

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const CustomButton = (props) => {
  const { title = "Enter", style = {}, textStyle = {}, onPress, color } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default function ClientProfile({ navigation }) {
  ////////////////////// Mustafa's Edit /////////////
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(3000).then(() => setRefreshing(false));
  }, [refreshing]);
  ///////////////////////////////////////////////////

  const { getEmail } = React.useContext(AuthContext);
  var myEmail = getEmail();
  const [isLoading, setIsLoading] = React.useState(true);
  const [details, setDetails] = React.useState({});
  const [img, setimg] = React.useState("");
  const getDetails = async () => {
    setDetails(await getMyDetails(myEmail));
    setIsLoading(false);
  };

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "image/*" });

    console.log(result);

    Alert.alert(
      "Profile Picture is Uploading",
      "Please Wait for Upload to Complete",
      [{ text: "ok", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );

    const resu = await ImageManipulator.manipulateAsync(
      result.uri,
      [{ resize: { width: 1000, height: 900 } }],
      {
        compress: 0.3,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      }
    );
    var imgerz = await resu.base64;

    var params = [`id= ${details.id}`];
    params = { table: "images", arr: params };
    params = JSON.stringify(params);
    params = "dellogin" + params;
    try {
      params = await fetchData(params);
    } catch (err) {
      console.log(err);
    }

    try {
      var response = await fetch("http://182.176.112.68:3000/senduserimage", {
        // Your POST endpoint
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({ data: imgerz, iden: details.id }), // This is your file object
      });
    } catch (err) {
      console.log(err);
      return;
    }
    imgerz = "";

    Alert.alert(
      "Profile Picture Updated",
      "Scroll Down to Refresh",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  if (isLoading == true) {
    getDetails();
  }
  if (isLoading == false) {
    var rating_array = [];
    for (let i = 0; i < details.ratings; i++) {
      rating_array.push(
        <Image
          style={{
            width: 20,
            height: 20,
            marginHorizontal: 1,
          }}
          source={require("../../../images/avo-colored.png")}
        />
      );
    }
    for (let i = 0; i < 5 - details.ratings; i++) {
      rating_array.push(
        <Image
          style={{
            width: 20,
            height: 20,
            marginHorizontal: 1,
          }}
          source={require("../../../images/avo-empty2.png")}
        />
      );
    }
    return (
      <SafeAreaView style={styles.container1}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getDetails} />
          }
        >
          <StatusBar
            barStyle="dark-content"
            // dark-content, light-content and default
            hidden={false}
            //To hide statusBar
            backgroundColor="white"
            //Background color of statusBar
            translucent={false}
            //allowing light, but not detailed shapes
            networkActivityIndicatorVisible={true}
          />
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="cover"
                // style={styles.canvas}
                style={{ flex: 1, width: undefined, height: undefined }}
                source={{ uri: "data:image/png;base64," + details.imger }}
              />
              <Button
                title={"Change Picture"}
                onPress={() => _pickDocument()}
              />
            </View>
            <View style={styles.buttonAndText}>
              <View style={styles.textContainer}>
                <Text style={styles.bigText}>{details.user_name}</Text>
                <Text style={styles.bigText2}>Freelancer</Text>
                <Text>{myEmail}</Text>
                <View style={{ flexDirection: "row" }}>{rating_array}</View>
              </View>
              <View style={styles.buttonDiv}>
                <CustomButton
                  title="Change  Password"
                  style={{ backgroundColor: "#98C739" }}
                  onPress={() => navigation.navigate("EditProfile", myEmail)}
                />
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

                  <Text>{details.about_me}</Text>
                </View>
                <CustomButton
                  title="Change description"
                  style={{ backgroundColor: "#8B7136", margin: 20 }}
                  onPress={() =>
                    navigation.navigate("EditDescription", myEmail)
                  }
                />
                <View style={{ height: 20 }}></View>
              </View>
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
      </SafeAreaView>
    );
  } else {
    return <LoadingScreen></LoadingScreen>;
  }
}

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
