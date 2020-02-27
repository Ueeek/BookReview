import React, { useState, useEffect } from 'react';
import {Image, Alert, Text, View, StyleSheet, Button } from 'react-native';
import {
  useNavigation,
  useNavigationKey,
  useFocusState
} from "react-navigation-hooks";
import useDimentions from "../hooks/useDimentions"


export function BookRaw({item}){
    const windowSize = useDimentions("window");
    const { navigate } = useNavigation();
    return(
        <View style={styles.bookRaw}>
            <View style={styles.bookContainer}>
                <Image
                    source={{ uri: item.smallImageUrl}}
                    style={styles.image}
                />
                <View stlye={styles.textContainer}>
                    <Text style={styles.text}>title</Text>
                    <Text style={styles.text}>{item.title}</Text>
                </View>
            </View> 
            <Button title="tap to detail" stlye={styles.button} onPress={()=>navigate("BookPage",{item:item})}/>
        </View>
    );
}

const styles = StyleSheet.create({
    bookRaw:{
        marginTop:5,
        marginBottom:5,
        flex:1,
        backgroundColor:"#ddd",
        alignItems:"center",
        justifyContent:"center",
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
        justifyContent: 'space-evenly'
    },
    textContainer:{
        flex:1,
        justifyContent:"space-around",
    },
});
