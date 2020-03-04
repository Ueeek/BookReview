import React,{useEffect} from 'react';
import {
  Text,
    Button,
    Container,
} from 'native-base';
import {
    View,
  StyleSheet,
    FlatList,
} from 'react-native';

import {BookRaw} from "../components/BookRaw"
import Colors from "../constants/Colors"
import { fetchRanking } from "../redux/actions/bookRanking";
import { useDispatch, useSelector } from "react-redux";

import {
  useNavigationParam
} from "react-navigation-hooks";

const renderItem = ({ item, index }) => {
    console.log(item.Item)
    return (
        <BookRaw item={item.Item}/>
    );
  };
const keyExtractor = (item, index) => {return index};

export default function HomeScreen() {
    const ranking=useSelector(state=>state["bookRanking"].rankingList)
    const dispatch =useDispatch();
    const flatList=()=>{
        return <FlatList
                data={ranking}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
    }
    useEffect(() => {
        dispatch(fetchRanking())
    },[]) 
    return(
        <Container style={styles.container}>
           {ranking.length==0 ? (<Text> please add book to this list</Text>) :  flatList()}
        </Container>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme,
  },
});

