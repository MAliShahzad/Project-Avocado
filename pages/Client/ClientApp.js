import React, { Component } from "react";
import { DrawerScreens } from "./Navigators/DrawerScreens";

export const ClientApp = ({email}) => {
  return <DrawerScreens email = {email}/>;
};
