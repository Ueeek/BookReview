import React, { useEffect } from 'react';
import {
  StyleSheet,
  Linking,
  Image,
} from 'react-native';
import {
  Content,
  Text,
  Container,
  Button,
  Card,
  Icon,
} from 'native-base';
import {
    useNavigation,
} from "react-navigation-hooks";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../redux/actions/Login";
import useDimentions from "../hooks/useDimentions"

import Colors from "../constants/Colors"

export default function SettingScreen() {
    const dispatch = useDispatch();
    const {navigate} = useNavigation();
    const user = useSelector(state=>state.Login)["user"]
    useEffect(()=>{
    },[user])
      return (
          <Container style={{justifyContent:"center"}}>
          {user ? (
            <Button onPress={()=>dispatch(logout())}>
                <Text>Logout</Text>
            </Button>
          ): navigate("Loading")
          }
          </Container>
      );
}

