import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { FreelancerSignup } from "../pages/FreelancerSignup";
import { Login } from "../pages/Login";
import { ChangePassword } from "../pages/ChangePassword";
import { Signup } from "../pages/Signup";
import { ClientSignup } from "../pages/ClientSignup";

const AuthStack = createStackNavigator();

export const AuthScreens = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Signup" component={Signup} />
    <AuthStack.Screen name="ClientSignup" component={ClientSignup} />
    <AuthStack.Screen name="FreelancerSignup" component={FreelancerSignup} />
    <AuthStack.Screen name="ForgotPassword" component={ChangePassword} />
  </AuthStack.Navigator>
);
