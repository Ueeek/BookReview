import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export function MyBarcodeReader(props){
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned=({val,data})=>{
      console.log("handleBarCodeScanned")
      props.setScannedVal(data)
      setScanned(true)
  }


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

    console.log("render")
    return(
        <View>
            <Text>aa</Text>
        <BarCodeScanner
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
        />
            <Text>aa</Text>
        </View>
    )
}

