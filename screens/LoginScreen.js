import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Form, Input, Item, Text, Container, Button, Icon } from "native-base";
import { useNavigation } from "react-navigation-hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  change_name,
  change_pass,
  login_mail,
  login_facebook,
} from "../redux/actions/Login";
import Colors from "../constants/Colors";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const user = useSelector((state) => state.Login)["user"];
  const name = useSelector((state) => state.Login)["name"];
  const pass = useSelector((state) => state.Login)["pass"];
  useEffect(() => {}, [user]);

  return (
    <Container
      style={{ justifyContent: "center", backgroundColor: Colors.theme2 }}
    >
      <Container style={{ justifyContent: "center" }}>
        <Form>
          <Text> Enter Info</Text>
          <Item>
            <Input
              placeholder="Username"
              value={name}
              onChangeText={(text) => dispatch(change_name(text))}
              autoCapitalize="none"
              autoCorrect={false}
              dataDetectorTypes="address"
              keyboardType="email-address"
            />
          </Item>
          <Item last>
            <Input
              placeholder="PassWord"
              value={pass}
              onChangeText={(text) => dispatch(change_pass(text))}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
          </Item>
        </Form>
      </Container>
      {user === null ? (
        <Container style={{ justifyContent: "center" }}>
          <Button
            bordered
            dark
            onPress={() => dispatch(login_mail(name, pass))}
            style={{ marginTop: 10 }}
          >
            <Icon
              type={"FontAwesome5"}
              name={"envelope"}
              style={{ color: "black", fontSize: 20 }}
            />
            <Text> Login</Text>
          </Button>
          <Button
            iconLeft
            bordered
            dark
            onPress={() => navigate("SignUp")}
            style={{ marginTop: 10 }}
          >
            <Icon
              type={"FontAwesome5"}
              name={"envelope"}
              style={{ color: "black", fontSize: 20 }}
            />
            <Text>move to signup page</Text>
          </Button>
          <Button
            bordered
            dark
            onPress={() => dispatch(login_facebook())}
            style={{ marginTop: 10 }}
          >
            <Icon
              type={"FontAwesome5"}
              name={"facebook-f"}
              style={{ color: "blue", fontSize: 20 }}
            />
            <Text> Login facebook </Text>
          </Button>
        </Container>
      ) : (
        navigate("Main")
      )}
    </Container>
  );
}
