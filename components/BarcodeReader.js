import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from "axios"

export function MyBarcodeReader(){
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedVal,setScannedVal] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned=({val,data})=>{
      setScannedVal(data)
      setScanned(true)
      alert("scanned"+scannedVal)
  }



  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (scanned){
          const zipcode="6995132"
          axios.get('https://api.zipaddress.net/?',{params:{zipcode:zipcode}})
                .then(res=>{
                    //console.log(res.status)
                    console.log(res.data.data.fullAddress)
                })
                .catch((err)=>{
                    console.log("err->",err)
                })
      return(
          <View>
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
          </View>
      );
    }
    else{
    return(
        <View style={styles.container}>
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
          onBarCodeScanned={scanned ? undefined :handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingTop: 15,
    backgroundColor: '#fff',
  },
})
