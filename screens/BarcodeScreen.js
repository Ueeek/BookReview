import React, { useState, useEffect } from 'react';
import {StyleSheet} from "react-native"
import {Footer, Text, View,Body,Button,Container,Header} from 'native-base';

import {MyBarcodeReader} from "../components/BarcodeReader"

export default function BarcodeScreen() {
    return(
        <Container style={styles.container}>
            <MyBarcodeReader/>
        </Container>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
