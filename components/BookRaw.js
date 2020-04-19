import React, { useState, useEffect } from 'react';
import {TouchableOpacity,Alert, StyleSheet} from 'react-native';
import {Image,Left,Body,Right, Text, View,Container,ListItem,Thumbnail, Button } from 'native-base';
import {
  useNavigation,
  useNavigationKey,
  useFocusState
} from "react-navigation-hooks";
import useDimentions from "../hooks/useDimentions"


export function BookRaw({item,rank}){
    const windowSize = useDimentions("window");
    const { navigate } = useNavigation();
    return(
         <ListItem onPress={()=>navigate("BookPage",{item:item})} style={styles.bookRaw}>
                <Left>
                    <Thumbnail square source={{ uri:item.smallImageUrl}} large/>
                </Left>
                <Body>
                    <Text>{item.title}</Text>
                    <Text note numberOfLines={1}>{item.author}</Text>
                    <Text style={styles.rankText}>{item.reviewAverage}</Text>
                </Body>
                <Right>
                    <Text style={styles.rankText}>{rank}</Text>
                </Right>
        </ListItem>
    );
}

const styles = StyleSheet.create({
    bookRaw:{
        marginTop:5,
        marginBottom:5,
        paddingLeft:10,
        paddingRight:10,
        flex:1,
        backgroundColor:"white",
        alignItems:"center",
    },
    text:{
        fontSize:10,
        fontWeight:"bold",
    },
    image:{
        width:50,
        height:70,
    },
    bookContainer:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent: 'space-around'
    },
    textContainer:{
        flex:1,
        justifyContent:"space-around",
    },
    rankText:{
        fontSize:20,
        fontWeight:"bold",
    },
});
