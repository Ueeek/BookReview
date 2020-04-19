import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from "../screens/LoginScreen";
import LoginLoadingScreen from  "../screens/LoginLoadingScreen";
import SignUpScreen from "../screens/SignUpScreen";

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      //
    Loading: LoginLoadingScreen,
    Login:LoginScreen,
    SignUp: SignUpScreen,
    Main: MainTabNavigator,
  },
  {
      initialRouteName: 'Loading'
    })
);
