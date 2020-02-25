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
import { addBook } from "../redux/actions";

export default function BookScreen() {
  const item = useNavigationParam('item');
  const dispatch =useDispatch();
  if (item){  
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: item.largeImageUrl}}
            style={{ width: 300, height: 400 }}
          />
          <Text>title: {item.title}</Text>
          <Text>author: {item.author}</Text>
          <Text onPress={() => { dispatch(addBook(item))}}>add1</Text>
          <Text onPress={() => { Linking.openURL(item.itemUrl)}}> Open In Rakuten</Text>
        </View>
      );
  } else {
      return(
          <Text> nothing</Text>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
  },
});

