import * as WebBrowser from 'expo-web-browser';
import React,{useState,useEffect} from 'react';
import {
  Text,
  Container,
  Header,
  List,
  Picker,
  Icon,
} from 'native-base';
import {
  StyleSheet,
    FlatList
} from 'react-native';

import {BookRaw} from "../components/BookRaw"
import Colors from "../constants/Colors"
import {TITLE,ADDED_DATE,SALES_DATE,REVIEW} from "../constants/BookListSortKey"

import {
  useNavigationParam
} from "react-navigation-hooks";
import { useDispatch, useSelector } from "react-redux";

import{fetchBookList} from "../redux/actions/bookList"

const renderItem = ({ item, index }) => {
    return (
        <BookRaw item={item}/>
    );
  };
const keyExtractor = (item, index) => {return index};

const sortBooklist = (data,key)=>{
    switch (key){
        case ADDED_DATE:
            data.sort((a,b)=>b[key].toMillis()-a[key].toMillis());
            return data;
        case SALES_DATE:
            data.sort((a,b)=>a[key].localeCompare(b[key]));
            return data
        case REVIEW:
            data.sort((a,b)=> parseFloat(b[key])-parseFloat(a[key]))
            return data
        case TITLE:
            data.sort((a,b)=>a[key].toUpperCase().localeCompare(b[key].toUpperCase()));
            return data;
        default:
            return data;
    }
}

const BookListSelector = state => state.bookList;
export default function BookListScreen() {
    const [sortKey,setSortKey] = useState(ADDED_DATE);
    let bookList = useSelector(BookListSelector)["bookList"];
    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(fetchBookList());
    }, [sortKey]);
    const flatList=()=>{
        return <FlatList
                data={sortBooklist(bookList,sortKey)}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
    }

    return(
        <Container style={styles.container}>
                <Text>select sortKey</Text>
                <Picker
                      mode="dropdown"
                      iosHeader="Sort by"
                      iosIcon={<Icon type="FontAwesome" name="caret-down" style={{ color: "black", fontSize: 25 }} />}
                      style={{ width: undefined }}
                      selectedValue={sortKey}
                      onValueChange={setSortKey.bind(this)}
                    >
                      <Picker.Item label="Recently Added" value={ADDED_DATE}/>
                      <Picker.Item label="sales Date" value={SALES_DATE}/>
                      <Picker.Item label="Review" value={REVIEW} />
                      <Picker.Item label="Title" value={TITLE} />
                    </Picker>
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

