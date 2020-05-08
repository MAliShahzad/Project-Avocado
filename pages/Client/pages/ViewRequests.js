import React, { Component } from "react";
import { StyleSheet, View, Image, Dimensions, ScrollView } from "react-native";
import { Block, Text, theme, Button, Icon, Card } from "galio-framework";
const { width, height } = Dimensions.get("screen");
import { RatingView } from "../../../components/RatingView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../Auth/Navigators/context";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { EmptyScreen } from "../../../components/EmptyScreen";
fetchData = async (w) => {
  var response = await fetch("http://182.176.112.68:3000/" + w);
  response = await response.json();
  // console.log(response);
  return await response;
};

const customerDisplayJobRequest = async (task_id) => {
  var params = [`id = ${task_id}`];
  params = { table: "request", item: "request_id", arr: params };
  params = JSON.stringify(params);
  params = "gettask" + params;

  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return [];
  }

  let freelancer_list = [];
  if (params.length == 0) {
    return [];
  }

  params.forEach((w) => freelancer_list.push(w.request_id));
  params = `id=${freelancer_list[0]}`;
  for (let index = 1; index < freelancer_list.length; index++) {
    params += ` OR id=${freelancer_list[index]}`;
  }
  params = [params];

  params = { table: "EXTRA_DATA", item: "*", arr: params };
  console.log(params);
  params = JSON.stringify(params);
  params = "getlogin" + params;

  try {
    params = await fetchData(params);
  } catch (err) {
    console.log(err);
    return [];
  }

  let idlist = [];
  params.forEach((w) => idlist.push(w.id));
  let query = `id=${idlist[0]}`;
  for (let index = 1; index < idlist.length; index++) {
    query += ` OR id=${idlist[index]}`;
  }
  query += " ORDER BY ratings DESC";

  query = [query];
  query = { table: "ratings", item: "*", arr: query };

  query = JSON.stringify(query);
  query = "getfreelancer" + query;

  try {
    query = await fetchData(query);
  } catch (err) {
    console.log(err);
    return [];
  }
  params.forEach((w) => {
    w.rating = 0;
  });
  params.forEach((w) => {
    for (let index = 0; index < query.length; index++) {
      if (query[index].id == w.id) {
        w.rating = query[index].ratings;
      }
    }
  });
  console.log("maroof");
  return params;
};

const DisplayCard = ({
  navigation,
  name,
  ratings,
  email,
  about_me,
  imageLink,
  task_id,
}) => {
  var rating_array = [];
  for (let i = 0; i < ratings; i++) {
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
  for (let i = 0; i < 5 - ratings; i++) {
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
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ClientViewsRequests", {
          name,
          email,
          about_me,
          imageLink,
          task_id,
        });
      }}
    >
      <Block style={styles.ratingcard}>
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
          <Image
            source={require("../../../images/profile.jpg")}
            style={{ height: 40, width: 40, borderRadius: 60 }}
            onError={() => require("../../../images/avocado-logo.png")}
          />
        </View>
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
          <Text style={{ marginHorizontal: 10 }}>{name}</Text>
          <View
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {rating_array}
          </View>
        </View>
      </Block>
    </TouchableOpacity>
  );
};

export const ViewRequests = ({ route, navigation }) => {
  const { getEmail } = React.useContext(AuthContext);
  const myEmail = getEmail();
  const [isLoading, setIsLoading] = React.useState(true);
  const [freelancerList, setfreelancerList] = React.useState([]);
  const getDetails = async () => {
    setfreelancerList(await customerDisplayJobRequest(route.params.id));
    // setfreelancerList([
    //   {
    //     user_name : 'Saad Arshad',
    //     ratings : 3,
    //     email : 'saad@hotmail.com',
    //     about_me : 'Uni student, computer sciences',
    //     image: "../../../images/mustafaAsif.jpeg"
    //   },
    //   {
    //     user_name : 'Abdullah Khalid',
    //     ratings : 5,
    //     email : 'ak@hotmail.com',
    //     about_me : 'Uni student, computer sciences',
    //     image: "../../../images/mustafaAsif.jpeg"
    //   }
    // ])

    setIsLoading(false);
  };
  if (isLoading == true) {
    getDetails();
    console.log(freelancerList);
  }
  if (freelancerList.length == 0 && isLoading == false) {
    return <EmptyScreen></EmptyScreen>;
  }
  if (isLoading == false) {
    return (
      <ScrollView>
        <View style={styles.container}>
          {freelancerList.map((freelancer) => {
            return (
              <DisplayCard
                name={freelancer.user_name}
                ratings={freelancer.rating}
                email={freelancer.email}
                about_me={freelancer.about_me}
                imageLink={freelancer.image}
                task_id={route.params.id}
                navigation={navigation}
              ></DisplayCard>
            );
          })}
        </View>
      </ScrollView>
    );
  } else {
    return <LoadingScreen></LoadingScreen>;
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    alignItems: "flex-start",
    // justifyContent: "flex-start",
    paddingVertical: 50,
    paddingBottom: 2000,
    flex: 1,
    width,
  },
  pic: {
    flexDirection: "row",
  },
  item: {
    paddingVertical: 10,
  },

  ratingcard: {
    backgroundColor: "#c5e1a5",
    borderWidth: 0,
    marginVertical: theme.SIZES.BASE * 0.875,
    justifyContent: "flex-start",
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 4,
    alignContent: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
});
