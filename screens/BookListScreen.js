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
  Row,
  FlatList,
} from 'react-native';

import {BookRaw} from "../components/BookRaw"

import {
  useNavigationParam
} from "react-navigation-hooks";
import { useDispatch, useSelector } from "react-redux";

const renderItem = ({ item, index }) => {
    console.log("list item->",item.title)
    console.log("index=>",index)
    return (
        <BookRaw item={item} />
    );
  };
const keyExtractor = (item, index) => {console.log("extractor",index);return index};

const BookListSelector = state => state.bookList;
export default function BookListScreen() {
    const bookList = useSelector(BookListSelector)["bookList"];
    console.log("book List",bookList)
    console.log("book len",bookList.length)
const flatList=()=>{
    return <FlatList
            data={bookList}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
        />
}
    return(
        <View>
        {true && flatList()}
        <Text> list </Text>
        <Text> {bookList.length}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
  },
});

