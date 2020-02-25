import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, Button } from 'react-native';
import {
  useNavigation,
  useNavigationKey,
  useFocusState
} from "react-navigation-hooks";


export function BookRaw({item}){
    const { navigate } = useNavigation();
    return(
        <View style={styles.bookRaw}>
            <Text>{item.title}</Text>
            <Text onPress={()=>navigate("BookPage",{item:item})}>tap to detail</Text>
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
    }
});
