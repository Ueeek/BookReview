import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from "axios";
import {
  useNavigation,
  useNavigationKey,
  useFocusState
} from "react-navigation-hooks";


export function MyBarcodeReader(){
  const [hasPermission, setHasPermission] = useState(null);
  const { navigate } = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

 async function bookAPI(isbn) {
     const id ="1096570044356823244"
     const url=`https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&keyword=%E6%9C%AC&booksGenreId=000&isbnjan=${isbn}&applicationId=${id}`
     console.log(url)
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
      bookAPI("9784167110116")
  }


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

    return(
        <Button
         title="button"
         onPress={handleBarCodeScanned}
        />
    )
    //return(
    //    <BarCodeScanner
    //          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
    //          onBarCodeScanned={handleBarCodeScanned}
    //          style={StyleSheet.absoluteFillObject}
    //    />
    //)
}

