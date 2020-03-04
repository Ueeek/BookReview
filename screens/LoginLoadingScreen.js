import React from 'react';
import {
  StyleSheet,
  Linking,
  Image,
  Text,
} from 'react-native';
import {
  Spiner,
  Content,
  Container,
  Button,
  Card,
  Icon,
} from 'native-base';
import {
  useNavigationParam,
  useNavigation,
} from "react-navigation-hooks";

import { useDispatch, useSelector } from "react-redux";
import { addBook,deleteBook } from "../redux/actions/bookList";
import useDimentions from "../hooks/useDimentions"

import Colors from "../constants/Colors"

export default function LoginLoadingScreen() {
      const dispatch = useDispatch();
      const user = useSelector(state=>state.Login)["user"]
      const {navigate} = useNavigation();
      
      return (
          <Button onPress={()=>navigate("Main")}>
          {user ? navigate("Main") : navigate("Login")}
            <Text>will be Login page</Text>
          </Button>
      );
}

