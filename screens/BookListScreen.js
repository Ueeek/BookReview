import * as WebBrowser from 'expo-web-browser';
import React,{useState,useEffect} from 'react';
import {
  Text,
  Container,
  Header,
  List,
  Body,
  Left,
  Title,
  Right,
  Button,
  Picker,
  Icon,
  ActionSheet,
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
import{SortKey} from "../constants/BookListSortKey"

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
    }, [sortKey,bookList]);
    const flatList=()=>{
        return <FlatList
                data={bookList}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
        return <FlatList
                data={sortBooklist(bookList,sortKey)}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
    }


    const ACTIONS=["Recently Added","Sales Date","Review","Title","cancel"]
    const STATES=[ADDED_DATE, SALES_DATE, REVIEW, TITLE]
    const handleOnPress = () =>{
        ActionSheet.show(
            {options: ACTIONS,
            title: "how to sort?",
            cancelButtonIndex:ACTIONS.length-1,
            },
            buttonIndex => {
                if(buttonIndex==ACTIONS.length-1){
                    setSortKey(STATES[buttonIndex])
                }
              }
            )}

    return(
        <Container style={styles.container}>
            <Header>
            <Left/>
                <Body>
                    <Title> BookList</Title>
                </Body>
                <Right>
                    <Button iconLeft transparent onPress={()=>handleOnPress()}>
                        <Icon type="FontAwesome" name="sort-amount-asc" style={{ color: "black", fontSize: 25 }} />
                    </Button >
                </Right>
             </Header>
             {bookList.length==0 ? (<Text> please add book to this list</Text>) :  flatList()}
        </Container>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme2,
  },
});
