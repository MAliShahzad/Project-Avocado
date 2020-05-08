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
} from "react-native";
import { AuthContext } from "../../Auth/Navigators/context";
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

//import { Card } from "react-native-elements";

export default function ClientProfile({ navigation }) {
  const { getEmail } = React.useContext(AuthContext);
  var myEmail = getEmail();
  const [isLoading, setIsLoading] = React.useState(true);
  const [details, setDetails] = React.useState({});
  const getDetails = async () => {
    setDetails(await getMyDetails(myEmail));
    setIsLoading(false);
  };

  if (isLoading == true) {
    getDetails();
  }
  if (isLoading == false) {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            // resizeMode="contain"
            // style={styles.canvas}
            style={{ flex: 1, width: undefined, height: undefined }}
            source={require("../../../images/profile.jpg")}
          />
        </View>
        <View style={styles.buttonAndText}>
          <View style={styles.textContainer}>
            <Text style={styles.bigText}>{details.user_name}</Text>
            <Text>{myEmail}</Text>
          </View>
          <View style={styles.buttonDiv}>
            <Button
              title="Edit"
              color="green"
              onPress={() => navigation.navigate("EditProfile", myEmail)}
            />
          </View>
        </View>
        <View style={styles.lowerPortion}>
          <View style={styles.name}>
            <Text style={styles.bigText}>Client</Text>
            <Button
              title="Edit"
              color="brown"
              onPress={() => navigation.navigate("EditDescription", myEmail)}
            />
          </View>
          <View style={{ padding: 20 }}>
            <Text>Who am I?</Text>
            <Text>{details.about_me}</Text>
          </View>
        </View>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
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
    height: 250,
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textContainer: {
    padding: 20,
    flex: 2,
  },
  buttonAndText: {
    flexDirection: "row",
  },
  buttonDiv: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  lowerPortion: {
    backgroundColor: "white",
    // flex: 1,
    height: 400,
    // alignItems: "center",
    // justifyContent: "center",
    width: Dimensions.get("window").width,
    borderTopColor: "green",
    borderColor: "white",
    borderWidth: 1,
  },
  name: {
    padding: 20,
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
});
