import React, {useState, useEffect } from 'react';
import {
  StyleSheet,
  Linking,
  Image,
} from 'react-native';
import {
    Form,
    Input,
    Item,
  Content,
  Text,
  Container,
  Button,
  Card,
  Icon,
} from 'native-base';
import {
  useNavigationParam,
    useNavigation,
} from "react-navigation-hooks";
import { useDispatch, useSelector } from "react-redux";
import { addBook,deleteBook } from "../redux/actions/bookList";
import { login_mail,signup_mail,logout} from "../redux/actions/Login";
import useDimentions from "../hooks/useDimentions"

import Colors from "../constants/Colors"

export default function LoginScreen() {
    const dispatch = useDispatch();
    const [mail,setMail] = useState("");
    const  [pass,setPass] = useState("");
    const {navigate} = useNavigation();
    const user = useSelector(state=>state.Login)["user"]
    useEffect(()=>{
    },[user])

      return (
          <Container style={{justifyContent:"center"}}>
          <Container style={{justifyContent:"center"}}>
            <Form>
            <Text> Enter Info</Text>
                <Item>
                  <Input
                    placeholder="Username"
                    value={mail}
                    onChangeText={(text)=>setMail(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    dataDetectorTypes="address"
                    keyboardType="email-address"
                    />
                </Item>
                <Item last>
                  <Input
                    placeholder="PassWard"
                    value={pass}
                    onChangeText={(text)=>setPass(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    />
                </Item>
                  </Form>
            </Container>
          {user===null ?(
            <Container style={{justifyContent:"center"}}>
            <Button iconLeft bordered onPress={()=>dispatch(login_mail(mail,pass))}>
				<Icon type={"FontAwesome5"} name={"envelope"} style={{color: "black", fontSize: 20}} />
                <Text> Login</Text>
            </Button>
            <Button iconLeft bordered onPress={()=>dispatch(signup_mail(mail,pass))}>
				<Icon type={"FontAwesome5"} name={"envelope"} style={{color: "black", fontSize: 20}} />
                <Text>signup</Text>
            </Button>
            </Container>
          ):
              navigate("Main")
          }
          </Container>
      );
}

