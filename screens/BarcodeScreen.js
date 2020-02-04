import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import {MyBarcodeReader} from "../components/BarcodeReader"
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function BarcodeScreen() {
    return(
        <View
        style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        }}>
            <MyBarcodeReader/>
        </View>
          );
}
