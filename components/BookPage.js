import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export function BookPage(props){
 async function bookAPI(isbn) {
     setIsLoading(true)
     const id="1096570044356823244"
     const url=`https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&keyword=%E6%9C%AC&booksGenreId=000&isbnjan=${isbn}&applicationId=${id}`
       //console.log("url->",url)
       const results = await axios.get(url);
      //// 通信ここまで
       console.log("results fetched");
       console.log(results.data.Items[0].Item.title)
       setBookTitle(results.data.Items[0].Item.title)
       setIsLoading(false)
 }
      //bookAPI(scannedVal)

    return(
        <View>
            <Text> {props.scanned}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingTop: 15,
    backgroundColor: '#fff',
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
