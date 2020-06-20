import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";
import { Button, Icon } from "native-base";

import BarcodeScreen from "../screens/BarcodeScreen";
import BookScreen from "../screens/BookScreen";
import BookListScreen from "../screens/BookListScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";

import Colors from "../constants/Colors";
import { NavigationActions } from "react-navigation";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: { headerMode: "screen" },
});

const BarcodeStack = createStackNavigator(
  {
    Barcode: {
      screen: BarcodeScreen,
      navigationOptions: {
        title: "Barcode",
        headerStyle: {
          header: null,
        },
      },
    },
  },
  config
);

BarcodeStack.navigationOptions = {
  tabBarLabel: "Barcode",
  tabBarIcon: ({ focused }) => (
    <Icon
      type={"FontAwesome5"}
      name={"barcode"}
      style={{ color: "black", fontSize: 20 }}
    />
  ),
};

const BookStack = createStackNavigator(
  {
    BookPage: {
      screen: BookScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: "BookPages",
          headerStyle: {
            header: null,
          },
          headerLeft: (props) => (
            <HeaderBackButton
              onPress={(props) => {
                navigation.dispatch(NavigationActions.back());
                //navigation.navigate("BookList");
              }}
            />
          ),
        };
      },
    },
  },
  config
);

BookStack.navigationOptions = {
  title: "tab1",
  taat: "agah",
  tabBarLabel: "Book",
  tabBarIcon: ({ focused }) => (
    <Icon
      type={"FontAwesome5"}
      name={"book"}
      style={{ color: "black", fontSize: 20 }}
    />
  ),
  title: "barcode",
};
const BookListStack = createStackNavigator(
  {
    BookList: {
      screen: BookListScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  config
);

BookListStack.navigationOptions = {
  title: "tab1",
  tabBarLabel: "BookList",
  tabBarIcon: ({ focused }) => (
    <Icon
      type={"FontAwesome5"}
      name={"list"}
      style={{ color: "black", fontSize: 20 }}
    />
  ),
};

const HomeStack = createStackNavigator(
  {
    HomeList: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  config
);

HomeStack.path = "";
HomeStack.navigationOptions = {
  title: "tab1",
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <Icon
      type={"FontAwesome5"}
      name={"home"}
      style={{ color: "black", fontSize: 20 }}
    />
  ),
};

HomeStack.path = "";
const SettingStack = createStackNavigator(
  {
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        title: "Setting",
        headerStyle: {
          header: null,
        },
      },
    },
  },
  config
);

SettingStack.navigationOptions = {
  tabBarLabel: "Setting",
  tabBarIcon: ({ focused }) => (
    <Icon
      type={"FontAwesome5"}
      name={"cog"}
      style={{ color: "black", fontSize: 20 }}
    />
  ),
};
SettingStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  BarcodeStack,
  BookStack,
  BookListStack,
  SettingStack,
});

tabNavigator.path = "";

export default tabNavigator;
