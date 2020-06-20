import React, { useEffect } from "react";
import { StyleSheet, Linking, Image } from "react-native";
import { Content, Text, Container, Button, Card, Icon } from "native-base";
import { useNavigation } from "react-navigation-hooks";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/Login";

import { auth } from "../firebase";
import useDimentions from "../hooks/useDimentions";

import Colors from "../constants/Colors";

export default function SettingScreen() {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  return (
    <Container
      style={{ justifyContent: "center", backgroundColor: Colors.theme2 }}
    >
      <Button
        transparent
        block
        bordered
        dark
        onPress={() => dispatch(logout())}
      >
        <Text style={{ color: "black" }}>Logout</Text>
      </Button>
    </Container>
  );
}
