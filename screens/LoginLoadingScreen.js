import React, { useEffect } from "react";
import { Text } from "react-native";
import { Button } from "native-base";
import {  useNavigation } from "react-navigation-hooks";

import { auth } from "../firebase";


export default function LoginLoadingScreen() {
  const { navigate } = useNavigation();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      {
        user ? navigate("Main") : navigate("Login");
      }
    });
  }, []);

  return (
    <Button onPress={() => navigate("Main")}>
      <Text>will be Login page</Text>
    </Button>
  );
}
