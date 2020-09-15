import React from "react";
import { StyleSheet } from "react-native";
import { Container } from "native-base";

import Colors from "../constants/Colors";
import { MyBarcodeReader } from "../components/BarcodeReader";

export default function BarcodeScreen() {
  return (
    <Container style={styles.container}>
      <MyBarcodeReader />
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme2,
  },
});
