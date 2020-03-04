import { AppLoading } from 'expo';
import React, { useState, useEffect } from 'react';
import {Text, Platform, StatusBar, StyleSheet, View } from 'react-native';
import {Container} from "native-base"
import { Provider, connect } from 'react-redux';
import store from './redux/store'
import firebase from"firebase"
import {firebaseConfig} from "./config/firebase"

import AppNavigator from './navigation/AppNavigator';


export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

 useEffect(()=>{
    firebase.initializeApp(firebaseConfig);
 },[]
 )
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider store={store}>
          <Container style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </Container>
      </Provider>
    );
  }
}

async function loadResourcesAsync() {
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
