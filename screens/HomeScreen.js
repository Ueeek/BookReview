import React, { useState, useEffect } from "react";
import {
  Spinner,
  Icon,
  Title,
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  ActionSheet,
} from "native-base";
import { StyleSheet, FlatList } from "react-native";

import { BookRaw } from "../components/BookRaw";
import Colors from "../constants/Colors";
import { fetchRanking } from "../redux/actions/bookRanking";
import { fetchBookList } from "../redux/actions/bookList";
import { useDispatch, useSelector } from "react-redux";
import { SortKey } from "../constants/BookRankingSortKey";

const renderItem = ({ item, index }) => {
  return <BookRaw item={item.Item} rank={index + 1} />;
};
const keyExtractor = (item, index) => {
  return index.toString();
};

export default function HomeScreen() {
  const ranking = useSelector((state) => state["bookRanking"].rankingList);
  const dispatch = useDispatch();
  const [genre, setGenre] = useState(SortKey["ALL"][0]);


  useEffect(() => {
    dispatch(fetchRanking(genre));
    dispatch(fetchBookList());
  }, [genre]);

  useEffect(() => {
    dispatch(fetchRanking(genre));
    dispatch(fetchBookList());
  }, []);

  var ACTIONS = Object.values(SortKey).map((x) => x[0]);
  ACTIONS.push("cancel");
  const STATES = Object.values(SortKey).map((x) => x[1]);
  const CANCELINDEX = ACTIONS.length - 1;
  const handleOnPress = () => {
    ActionSheet.show(
      {
        options: ACTIONS,
        title: "how to sort?",
        cancelButtonIndex: CANCELINDEX,
      },
      (buttonIndex) => {
        if (buttonIndex != CANCELINDEX) {
          setGenre(STATES[buttonIndex]);
        }
      }
    );
  };

  const flatList = () => {
    return (
      <FlatList
        data={ranking}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    );
  };

  return (
    <Container style={styles.container}>
      <Header>
        <Left />
        <Body>
          <Title> Home</Title>
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
      <Container>
        {ranking.length == 0 ? (
          <Container>
            <Spinner color="black" />
          </Container>
        ) : (
          flatList()
        )}
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme2,
  },
});
