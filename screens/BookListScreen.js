import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from "react";
import {
  Text,
  Container,
  Header,
  Body,
  Left,
  Title,
  Right,
  Button,
  Icon,
  ActionSheet,
} from "native-base";
import { StyleSheet, FlatList } from "react-native";

import { BookRaw } from "../components/BookRaw";
import Colors from "../constants/Colors";
import {
  TITLE,
  ADDED_DATE,
  SALES_DATE,
  REVIEW,
} from "../constants/BookListSortKey";

import { useDispatch, useSelector } from "react-redux";

import { fetchBookList } from "../redux/actions/bookList";

const renderItem = ({ item, _ }) => {
  return <BookRaw item={item} />;
};
const keyExtractor = (_, index) => {
  return index.toString();
};

const sortBooklist = (data, key) => {
  console.log("sort called", key);
  switch (key) {
    case ADDED_DATE:
      return data.slice().sort((a, b) => b[key].toMillis() - a[key].toMillis());
    case SALES_DATE:
      return data.slice().sort((a, b) => a[key].localeCompare(b[key]));
    case REVIEW:
      return data
        .slice()
        .sort((a, b) => parseFloat(b[key]) - parseFloat(a[key]));
    case TITLE:
      return data
        .slice()
        .sort((a, b) =>
          a[key].toUpperCase().localeCompare(b[key].toUpperCase())
        );
    default:
      console.log("default");
      return data;
  }
};

const BookListSelector = (state) => state.bookList;
export default function BookListScreen() {
  const [sortKey, setSortKey] = useState(ADDED_DATE);
  let bookList = useSelector(BookListSelector)["bookList"];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookList());
  }, []);

  const flatList = () => {
    return (
      <FlatList
        data={sortBooklist(bookList, sortKey)}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    );
  };

  const ACTIONS = ["Recently Added", "Sales Date", "Review", "Title", "cancel"];
  const STATES = [ADDED_DATE, SALES_DATE, REVIEW, TITLE];
  const handleOnPress = () => {
    ActionSheet.show(
      {
        options: ACTIONS,
        title: "how to sort?",
        cancelButtonIndex: ACTIONS.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex != ACTIONS.length - 1) {
          console.log("set key");
          setSortKey(STATES[buttonIndex]);
        }
      }
    );
  };

  return (
    <Container style={styles.container}>
      <Header>
        <Left />
        <Body>
          <Title> BookList</Title>
        </Body>
        <Right>
          <Button iconLeft transparent onPress={() => handleOnPress()}>
            <Icon
              type="FontAwesome"
              name="sort-amount-asc"
              style={{ color: "black", fontSize: 25 }}
            />
          </Button>
        </Right>
      </Header>
      {bookList.length == 0 ? (
        <Text> please add book to this list</Text>
      ) : (
        flatList()
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme2,
  },
});
