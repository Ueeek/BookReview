import React, { useState, useEffect } from 'react';
import {Container,Text, View,Button } from 'native-base';
import {Alert,StyleSheet} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from "axios";
import {
  useNavigation,
  useNavigationKey,
  useFocusState
} from "react-navigation-hooks";

import useDimentions from "../utils/useDimentions"

import{apiConfig} from "../config/api"

export function MyBarcodeReader(){
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { navigate } = useNavigation();
  const windowSize = useDimentions("window");

  useEffect(() => {
    (async () => { const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

 async function bookAPI(isbn) {
     console.log("isbn"+isbn)
     const id = apiConfig.RAKUTEN_API_ID
     const affiliateId=apiConfig.AFFILIATEID
     const url=`https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&keyword=%E6%9C%AC&booksGenreId=000&isbnjan=${isbn}&applicationId=${id}&affiliateId=${affiliateId}`
     axios.get(url)
        .then((res)=>{
            const item = res.data.Items[0].Item
            if (typeof item==="undefined"){
                setScanned(false)
                return;
            }
            Alert.alert(
             item.title,
             item.author,
            [
                {text: 'Move To Book Page', onPress: () =>{setScanned(false); navigate("BookPage",{item:item})}},
                {
                    text: 'Scan Again',
                    onPress: ()=>{setScanned(false)},
                    style: 'cancel',
                },
            ],
            {cancelable: false},
            );
        })
        .catch((err)=>{
            setScanned(false)
        })
 }

  const handleBarCodeScanned=({val,data})=>{
      const isbn = (data === undefined) ? "9784167110116" : data
	  setScanned(true)
      bookAPI(isbn)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

    //return(
    //    <Button onPress={handleBarCodeScanned}>
    //        <Text>Press</Text>
    //    </Button>
    //)
    return(
        <Container style={styles.container}>
            <Text style={styles.discription}> scan your ISBN code</Text>
            <BarCodeScanner
                  barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  style={[StyleSheet.absoluteFillObject, styles.scanner(windowSize.width,windowSize.height)]}
            />
        </Container>
    )

}

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        justifyContent: "center",
        flex:1,
    },
    discription:{
        fontSize:20,
    },
    scanner :(wid,hei)=>({
        width: wid,
        height: hei,
    })
});

