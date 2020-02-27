import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Button,
} from 'react-native';
import {
  useNavigationParam
} from "react-navigation-hooks";
import { useDispatch, useSelector } from "react-redux";
import { addBook,deleteBook } from "../redux/actions";
import useDimentions from "../hooks/useDimentions"

function searchIsbn(list,isbn){
    const ret = list.some(value=>value.isbn==isbn)
    return ret;
}

export default function BookScreen() {
  const item = useNavigationParam('item');
  const dispatch =useDispatch();
  const BookListSelector = state => state.bookList;
  const bookList = useSelector(BookListSelector)["bookList"];
  const windowSize = useDimentions("window");
  if (item){  
      return (
        <ScrollView>
        <View style={styles.container}>
          <View style={styles.bookContainer}>
            <Image
                source={{ uri: item.largeImageUrl}}
                style={styles.image(windowSize.width)}
            />
            <View style={styles.textContainer(windowSize.width)}>
                <Text style={styles.titleText}>title</Text>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.authorText}>author</Text>
                <Text style={styles.authorText}>{item.author}</Text>
            </View> 
          </View>
          {searchIsbn(bookList,item.isbn) 
              ? <Button title="delete" stlye={styles.actionButton} onPress={()=>{dispatch(deleteBook(item))}}/>
              : <Button title="add" stlye={styles.actionButton} onPress={()=>{dispatch(addBook(item))}}/>}
          
          <Button title="Open In rakuten" onPress={() => { Linking.openURL(item.itemUrl)}} style={styles.actionButton}/>
        </View>
        </ScrollView>
      );
  } else {
      return(
          <Text> nothing to Display</Text>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
  },
  bookContainer:{
      flex:1,
      flexDirection:"column",
      alignItems:"center",
  },
  image:(w)=>({
      width: w*0.5,
      height: w*0.7,
  }),
  textContainer:(w)=>({
      width: w*0.9,
  }),

  authorText:{
      fontSize:20,
  },
  titleText:{
      fontSize:20,
  },
    actionButton:{
        fontSize:20,
    },
});

