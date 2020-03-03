import React from 'react';
import { Platform} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Icon } from 'native-base';

import BarcodeScreen from "../screens/BarcodeScreen";
import BookScreen from "../screens/BookScreen";
import BookListScreen from "../screens/BookListScreen";
import HomeScreen from "../screens/HomeScreen";

const config = Platform.select({
    web: { headerMode: 'screen'},
    default: {headerMode:"screen"},
});

const BarcodeStack = createStackNavigator(
  {
    Barcode:{
        screen:BarcodeScreen,
        navigationOptions: {
          title: 'Barcode',
        },
    }
  },
  config,

);

BarcodeStack.navigationOptions = {
  tabBarLabel: 'Barcode',
  tabBarIcon: ({ focused }) => (
				<Icon type={"FontAwesome5"} name={"barcode"} style={{color: "black", fontSize: 20}} />
  ),
};

const BookStack = createStackNavigator(
    {
        BookPage:{
            screen:BookScreen,
                    navigationOptions: {
          title: 'BookPage',
        },
        }

    }, config
);

BookStack.navigationOptions = {
    title:"tab1",
    taat:"agah",
  tabBarLabel: 'Book',
  tabBarIcon: ({ focused }) => (
				<Icon type={"FontAwesome5"} name={"book"} style={{color: "black", fontSize: 20}} />
  ),
  title: "barcode",
};
const BookListStack = createStackNavigator(
    {
        BookList: {
            screen:BookListScreen,
            navigationOptions: {
            title: 'BookList',
        },
        }
    },
    config
);

BookListStack.navigationOptions = {
    title:"tab1",
  tabBarLabel: 'BookList',
  tabBarIcon: ({ focused }) => (
				<Icon type={"FontAwesome5"} name={"list"} style={{color: "black", fontSize: 20}} />
  ),
};

const HomeStack = createStackNavigator(
    {
        HomeList: {
            screen:HomeScreen,
            navigationOptions: {
            title: 'Home',
        },
        }


    },
    config
);

HomeStack.path = '';
HomeStack.navigationOptions = {
    title:"tab1",
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
				<Icon type={"FontAwesome5"} name={"home"} style={{color: "black", fontSize: 20}} />
  ),
};


HomeStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  BarcodeStack,
  BookStack,
  BookListStack,
});

tabNavigator.path = '';

export default tabNavigator;
