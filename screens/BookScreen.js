import React from 'react';
import {
  StyleSheet,
  Linking,
  Image,
ScrollView,
} from 'react-native';
import {
  Content,
  Text,
  Container,
  Button,
  Card,
  Icon,
  Accordion,
} from 'native-base';
import {
  useNavigationParam
} from "react-navigation-hooks";
import { useDispatch, useSelector } from "react-redux";
import { addBook,deleteBook,fetchBookList } from "../redux/actions/bookList";
import useDimentions from "../hooks/useDimentions"

import Colors from "../constants/Colors"

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
        <Container style={styles.container}>
          <Container style={styles.bookContainer}>
            <Image
                resizeMode="contain"
                source={{ uri: item.largeImageUrl}}
                style={styles.image(windowSize.width)}
            />
          </Container>
            <Container style={styles.textContainer}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.authorText}>{item.reviewAverage} ({item.reviewCount} reviewers)</Text>
                <Text style={styles.authorText}>Author: {item.author}</Text>
                <Text style={styles.authorText}>publisher: {item.publisherName}</Text>
            </Container>
          <Container style={styles.buttonContainer}>
              {searchIsbn(bookList,item.isbn) 
                  ? (<Button block bordered iconLeft dark onPress={()=>{dispatch(deleteBook(item));dispatch(fetchBookList())}}>
                     <Icon type={"MaterialCommunityIcons"} name={"playlist-remove"} style={{color: "black", fontSize: 20}} />
                      <Text>delete</Text>
                      </Button>)
                  : (<Button block bordered iconLeft dark onPress={()=>{dispatch(addBook(item));dispatch(fetchBookList())}}>
                        <Icon type={"MaterialCommunityIcons"} name={"playlist-plus"} style={{color: "black", fontSize: 20}} />
                        <Text>add</Text>
                    </Button>)}
              
              <Button  block bordered  iconLeft dark onPress={()=>{Linking.openURL((item.affiliateUrl))}} style={{marginTop:10}}>
                <Icon type={"Feather"} name={"shopping-cart"} style={{color: "black", fontSize: 20}} />
                <Text>Open In rakuten </Text>
              </Button>
          </Container>
        </Container>
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
    alignItems: "center",
    backgroundColor: Colors.theme2,
  },
    bookContainer:{
      flex:1,
      backgroundColor:"#ddd",
      backgroundColor:"#FFF",
      paddingTop:20,
    backgroundColor: Colors.theme2,
  },
  image:(w)=>({
      width:w*0.8,
      flex:1,
  }),
  textContainer:{
      flex:1,
      paddingRight:5,
      paddingLeft:5,
    backgroundColor: Colors.theme2,
  },

  authorText:{
      margin:5,
      fontSize:20,
  },
  titleText:{
      marginVertical:5,
      fontSize:20,
      fontWeight:"bold",
  },
  buttonContainer:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
  },
});

