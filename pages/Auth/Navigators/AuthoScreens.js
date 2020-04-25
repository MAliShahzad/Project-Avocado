import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { FreelancerSignup } from "../pages/FreelancerSignup";
import { Login } from "../pages/Login";
import { ChangePassword } from "../pages/ChangePassword";
import { Signup } from "../pages/Signup";
import { ClientSignup } from "../pages/ClientSignup";

const AuthStack = createStackNavigator();

export const AuthScreens = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerTintColor: "white",
    }}
  >
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{
        headerTransparent: true,
        title: "",
      }}
    />
    <AuthStack.Screen
      name="Signup"
      component={Signup}
      options={{
        headerTransparent: true,
        title: "",
      }}
    />
    <AuthStack.Screen
      name="ClientSignup"
      component={ClientSignup}
      options={{
        headerTransparent: true,
        title: "",
      }}
    />
    <AuthStack.Screen
      name="FreelancerSignup"
      component={FreelancerSignup}
      options={{
        headerTransparent: true,
        title: "",
      }}
    />
    <AuthStack.Screen
      name="ForgotPassword"
      component={ChangePassword}
      options={{
        headerTransparent: true,
        title: "",
      }}
    />
  </AuthStack.Navigator>
);
