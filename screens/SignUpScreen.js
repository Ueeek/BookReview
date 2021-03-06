import React, { useEffect } from "react";
import { Form, Input, Item, Text, Container, Button, Icon } from "native-base";
import { useNavigation } from "react-navigation-hooks";
import { useDispatch, useSelector } from "react-redux";
import { change_name, change_pass, signup_mail } from "../redux/actions/Login";

export default function SignUpScreen() {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const user = useSelector((state) => state.Login)["user"];
  const name = useSelector((state) => state.Login)["name"];
  const pass = useSelector((state) => state.Login)["pass"];
  useEffect(() => {}, [user]);

  return (
    <Container style={{ justifyContent: "center" }}>
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
              placeholder="PassWard"
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
            iconLeft
            bordered
            dark
            onPress={() => dispatch(signup_mail(name, pass))}
          >
            <Icon
              type={"FontAwesome5"}
              name={"envelope"}
              style={{ color: "black", fontSize: 20 }}
            />
            <Text>signup</Text>
          </Button>
          <Button
            iconLeft
            bordered
            dark
            onPress={() => navigate("Login")}
            style={{ marginTop: 10 }}
          >
            <Icon
              type={"FontAwesome5"}
              name={"envelope"}
              style={{ color: "black", fontSize: 20 }}
            />
            <Text>go back</Text>
          </Button>
        </Container>
      ) : (
        navigate("Main")
      )}
    </Container>
  );
}
