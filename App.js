import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./pages/Auth/Navigators/context";
import { ClientApp } from "./pages/Client/ClientApp";
import { FreelancerApp } from "./pages/Freelancer/FreelancerApp";
import { AuthScreens } from "./pages/Auth/Navigators/AuthoScreens";
import { LoadingScreen } from "./components/LoadingScreen";
import { Updates } from "expo";

const myIp = "http://182.176.112.68:3000/";

const HomeSelector = (userToken) => {
  if (userToken == "CT") return <ClientApp />;
  else if (userToken == "FL") return <FreelancerApp />;
  else return <AuthScreens />;
};

var currentEmail = "-";

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      clientSignIn: (email) => {
        setIsLoading(false);
        currentEmail = email;
        setUserToken("CT");
      },
      freelancerSignIn: (email) => {
        setIsLoading(false);
        currentEmail = email;
        setUserToken("FL");
      },
      getEmail: () => currentEmail,
      getIP: () => myIp,
      signuUp: () => {
        setIsLoading(false);
        setUserToken("sasd");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
        Updates.reload();
      },
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>{HomeSelector(userToken)}</NavigationContainer>
    </AuthContext.Provider>
  );
}
