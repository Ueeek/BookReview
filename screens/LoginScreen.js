import React from 'react';
import {
  StyleSheet,
  Linking,
  Image,
} from 'react-native';
import {
  Content,
  Text,
  Container,
  Button,
  Card,
  Icon,
} from 'native-base';
import {
  useNavigationParam
} from "react-navigation-hooks";
import { useDispatch, useSelector } from "react-redux";
import { addBook,deleteBook } from "../redux/actions/bookList";
import useDimentions from "../hooks/useDimentions"

import Colors from "../constants/Colors"

export default function LoginScreen() {
      return (
          <Text> will be Login page</Text>
      );
}

