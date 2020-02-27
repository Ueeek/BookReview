import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from "axios";
import {
  useNavigation,
  useNavigationKey,
  useFocusState
} from "react-navigation-hooks";

import useDimentions from "../hooks/useDimentions"

export function MyBarcodeReader(){
  const [hasPermission, setHasPermission] = useState(null);
  const { navigate } = useNavigation();
  const windowSize = useDimentions("window");

  useEffect(() => {
    (async () => { const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

 async function bookAPI(isbn) {
     const id ="1096570044356823244"
     const url=`https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&keyword=%E6%9C%AC&booksGenreId=000&isbnjan=${isbn}&applicationId=${id}`
     const results = await axios.get(url);
      //// 通信ここまで
     console.log("results fetched");
     const item = results.data.Items[0].Item
     Alert.alert(
        'Scanned ISBN'+isbn,
         'title:'+item.title,
        [
            {text: 'Move To Book Page', onPress: () =>navigate("BookPage",{item:item})},
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
        ],
      {cancelable: false},
      );
 }

  const handleBarCodeScanned=({val,data})=>{
      const isbn = (data === null) ? "9784167110116" : data
      bookAPI(isbn)
  }


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

    //return(
    //    <Button
    //     title="button"
    //     onPress={handleBarCodeScanned}
    //    />
    //)
    return(
        <View style={styles.container}>
            <Text style={styles.discription}> scan your ISBN code</Text>
            <BarCodeScanner
                  barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
                  onBarCodeScanned={handleBarCodeScanned}
                  style={[StyleSheet.absoluteFillObject, styles.scanner(windowSize.width,windowSize.height)]}
            />
        </View>
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
        height: hei*0.1,
    })
});

