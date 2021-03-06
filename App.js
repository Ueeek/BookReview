import { AppLoading } from "expo";
import { decode, encode } from "base-64";
import React, { useState, useEffect } from "react";
import { Text, Platform, StatusBar, StyleSheet, View } from "react-native";
import { Container, Root } from "native-base";
import { Provider, connect } from "react-redux";
import store from "./redux/store";
import firebase from "firebase";
import { firebaseConfig } from "./config/firebase";
import * as Font from "expo-font";

import AppNavigator from "./navigation/AppNavigator";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const firebaseApp = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

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
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <Root>
            <AppNavigator />
          </Root>
        </Container>
      </Provider>
    );
  }
}

async function loadResourcesAsync() {
    console.log("FONT LOGIND");
  await Promise.all([Font.loadAsync({
    "feather":require("./node_modules/native-base/Fonts/Feather.ttf"),
    "fontAwesome":require("./node_modules/native-base/Fonts/FontAwesome.ttf"),
    "FontAwesome":require("./node_modules/native-base/Fonts/FontAwesome.ttf"),
    "FontAwesome5Free-Solid":require("./node_modules/native-base/Fonts/FontAwesome5_Solid.ttf"),
    "FontAwesome5Free-Regular":require("./node_modules/native-base/Fonts/FontAwesome5_Regular.ttf"),
    "FontAwesome5Free-Brands":require("./node_modules/native-base/Fonts/FontAwesome5_Brands.ttf"),
  })])
};


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
