import React from "react";
import { Text, Container, Button } from "native-base";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/Login";

import Colors from "../constants/Colors";

export default function SettingScreen() {
  const dispatch = useDispatch();
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
