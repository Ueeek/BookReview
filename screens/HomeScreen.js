import React,{useState,useEffect} from 'react';
import {
  Text,
    Spinner,
    Picker,
    Icon,
    Container,
} from 'native-base';
import {
  StyleSheet,
    FlatList,
} from 'react-native';

import {BookRaw} from "../components/BookRaw"
import Colors from "../constants/Colors"
import { fetchRanking } from "../redux/actions/bookRanking";
import{fetchBookList} from "../redux/actions/bookList";
import { useDispatch, useSelector } from "react-redux";


const renderItem = ({ item, index }) => {
    return (
        <BookRaw item={item.Item} rank={index+1}/>
    );
  };
const keyExtractor = (item, index) => {return index};

export default function HomeScreen() {
    const ranking=useSelector(state=>state["bookRanking"].rankingList)
    const dispatch =useDispatch();
    const [genre,setGenre] = useState("001");
    const onValueChange=(val)=> {
        setGenre(val)
    };
    const flatList=()=>{
        return <FlatList
                data={ranking}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
    }
    useEffect(() => {
        dispatch(fetchRanking(genre))
    },[genre]) 
    useEffect(()=>{
        dispatch(fetchBookList());
    },[])

    return(
        <Container style={styles.container}>
        <Text>select Genre</Text>
        <Picker
              mode="dropdown"
              iosHeader="Select genre"
              iosIcon={<Icon type="FontAwesome" name="caret-down" style={{ color: "black", fontSize: 25 }} />}
              style={{ width: undefined }}
              selectedValue={genre}
              onValueChange={onValueChange.bind(this)}
            >
              <Picker.Item label="All Book" value="001" />
              <Picker.Item label="Comic" value="001001" />
              <Picker.Item label="study" value="001002" />
              <Picker.Item label="Novel" value="001004" />
              <Picker.Item label="PC" value="001005" />
              <Picker.Item label="beauty" value="001010" />
            </Picker>
        <Container>
        {ranking.length==0 ?
            (
                <Container>
                <Text>Loading</Text>
                <Spinner color="black"/>
                </Container>
            )
            :flatList()}
        </Container>
        </Container>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme,
  },
});

