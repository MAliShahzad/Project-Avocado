import React, { Component } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { Block, Text, theme, Button, Icon, Card } from "galio-framework";
const { width, height } = Dimensions.get("screen");
import { RatingView } from "../../../components/RatingView";
import { TouchableOpacity } from "react-native-gesture-handler";

const DisplayCard = ({
  navigation,
  name,
  stars,
  email,
  description,
  imageLink
}) => (
  <TouchableOpacity
    onPress={() => {
      navigation.navigate("ClientViewsFreelancer", {
        name,
        email,
        description
      });
    }}
  >
    <Block style={styles.ratingcard}>
      <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
        <Image
          source={require("../../../images/mustafaAsif.jpeg")}
          defaultSource={require("../../../images/avocado-logo.png")}
          style={{ height: 40, width: 40, borderRadius: 60 }}
          onError={() => require("../../../images/avocado-logo.png")}
        />
      </View>
      <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
        <Text style={{ marginHorizontal: 10 }}>{name}</Text>
        <RatingView
          style={{ alignItems: "flex-start" }}
          stars={stars}
          size={20}
        />
      </View>
    </Block>
  </TouchableOpacity>
);

export const BrowseFreelancers = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <DisplayCard
        name="Sabeeh Rehman"
        stars={5}
        email="mustafaasif1@hotmail.com"
        description="proud owner of 25 crore"
        navigation={navigation}
      ></DisplayCard>
      <DisplayCard
        name="Maroof Saleemi"
        stars={3}
        email="mustafaasif1@hotmail.com"
        description="proud owner of 25 crore"
        navigation={navigation}
      ></DisplayCard>
      <DisplayCard
        name="Omer Shakeel"
        stars={4}
        email="mustafaasif1@hotmail.com"
        description="proud owner of 25 crore"
        navigation={navigation}
      ></DisplayCard>
      <DisplayCard
        name="Ali Shahzad"
        stars={1}
        email="mustafaasif1@hotmail.com"
        description="proud owner of 25 crore"
        navigation={navigation}
      ></DisplayCard>
      <DisplayCard
        name="Mustafa Asif"
        stars={2}
        email="mustafaasif1@hotmail.com"
        description="proud owner of 24 crore"
        navigation={navigation}
      ></DisplayCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#558b2f",
    paddingHorizontal: 20,
    alignItems: "flex-start",
    // justifyContent: "flex-start",
    paddingVertical: 50,
    width
  },
  pic: {
    flexDirection: "row"
  },
  item: {
    paddingVertical: 10
  },

  ratingcard: {
    backgroundColor: "#f8ffd7",
    borderWidth: 0,
    marginVertical: theme.SIZES.BASE * 0.875,
    justifyContent: "flex-start",
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 4,
    alignContent: "center",
    borderRadius: 10,
    flexDirection: "row"
  }
});
