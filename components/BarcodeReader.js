import React, { useState, useEffect } from "react";
import { Container, Text, Button } from "native-base";
import { Alert, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { useNavigation } from "react-navigation-hooks";
import useDimentions from "../hooks/useDimentions";
import { apiConfig } from "../config/api";

export function MyBarcodeReader() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { navigate } = useNavigation();
  const windowSize = useDimentions("window");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function bookAPI(isbn) {
    const id = apiConfig.RAKUTEN_API_ID;
    const affiliateId = apiConfig.AFFILIATEID;
    const url = `https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&keyword=%E6%9C%AC&booksGenreId=000&isbnjan=${isbn}&applicationId=${id}&affiliateId=${affiliateId}`;
    axios
      .get(url)
      .then((res) => {
        const item = res.data.Items[0].Item;
        if (typeof item === "undefined") {
          setScanned(false);
          return;
        }
        Alert.alert(
          item.title,
          item.author,
          [
            {
              text: "Move To Book Page",
              onPress: () => {
                navigate("BookPage", { item: item });
              },
            },
            {
              text: "Scan Again",
              onPress: () => {
                setScanned(false);
              },
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
      })
      .catch((err) => {
        setScanned(false);
      });
  }

  const handleBarCodeScanned = ({ val, data }) => {
    const isbn = data;
    setScanned(true);
    bookAPI(isbn);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Container style={styles.container}>
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[
          StyleSheet.absoluteFillObject,
          styles.scanner(windowSize.width, windowSize.height),
        ]}
      >
        <Button
          transparent
          bordered
          active={!scanned}
          onPress={() => {
            setScanned(false);
          }}
        >
          <Text style={styles.discription}>
            {" "}
            {scanned ? "retry" : "scanning "}{" "}
          </Text>
        </Button>
      </BarCodeScanner>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  discription: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
  scanner: (wid, hei) => ({
    width: wid,
    height: hei,
  }),
});
