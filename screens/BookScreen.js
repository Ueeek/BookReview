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
} from 'react-native';
import {
  useNavigationParam
} from "react-navigation-hooks";

export default function BookScreen() {
  const item = useNavigationParam('item');
  if (item){  
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: item.largeImageUrl}}
            style={{ width: 300, height: 400 }}
          />
          <Text>title: {item.title}</Text>
          <Text>author: {item.author}</Text>
          <Text>publisher: {item.publisherName}</Text>
          <Text>abstract: {item.itemCaption}</Text>
          <Text onPress={() => { Linking.openURL(item.itemUrl)}}> Open In Rakuten</Text>
          <Text > add To List </Text>
        </View>
      );
  } else {
      return(
          <Text> nothing</Text>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
  },
});

