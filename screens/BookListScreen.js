import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Text,
  Container,
  Header,
  List,
} from 'native-base';
import {
  StyleSheet,
    FlatList
} from 'react-native';

import {BookRaw} from "../components/BookRaw"
import Colors from "../constants/Colors"

import {
  useNavigationParam
} from "react-navigation-hooks";
import { useDispatch, useSelector } from "react-redux";

const renderItem = ({ item, index }) => {
    console.log(BookRaw)
    return (
        <BookRaw item={item}/>
    );
  };
const keyExtractor = (item, index) => {console.log("extractor",index);return index};

const BookListSelector = state => state.bookList;
export default function BookListScreen() {
    const bookList = useSelector(BookListSelector)["bookList"];
    const flatList=()=>{
        return <FlatList
                data={bookList}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
    }
    return(
        <Container style={styles.container}>
           {bookList.length==0 ? (<Text> please add book to this list</Text>) :  flatList()}
        </Container>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme,
  },
});

