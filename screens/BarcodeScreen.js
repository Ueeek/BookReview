import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import {MyBarcodeReader} from "../components/BarcodeReader"

export default function BarcodeScreen() {
    const [scanned, setScanned] = useState(false)
    const [scannedVal,setScannedVal] = useState(null);
    console.log(scanned)
    if(scanned ){
        return(
        <View style={styles.container}>
            <Text>scanned</Text>
            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false) } />
        </View>
        )
    }
    else{
        return(
            <View style={styles.container}>
                <MyBarcodeReader />
            </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
   // backgroundColor: '#fff',
   // justifyContent: 'center',
    //alignItems:"center",
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
    text:{
        fontSize:20,
    },
})
