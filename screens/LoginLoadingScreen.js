import React,{useEffect} from 'react';
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

import{auth} from "../firebase"

import Colors from "../constants/Colors"

export default function LoginLoadingScreen() {
      const {navigate} = useNavigation();

     useEffect(() =>{
         auth.onAuthStateChanged((user=>{
          {user ? navigate("Main") : navigate("Login")}
         }))
     },[])
      
      return (
          <Button onPress={()=>navigate("Main")}>
            <Text>will be Login page</Text>
          </Button>
      );
}

