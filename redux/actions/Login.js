import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CHANGE_NAME,
  CHANGE_PASS,
} from "../actionTypes";
import firebase from "firebase";
import { facebookConfig } from "../../config/facebook";
//import{ GoogleSignin} from "react-native-google-signin"
import * as Facebook from "expo-facebook";

export const change_name = (name) => ({
  type: CHANGE_NAME,
  name: name,
});

export const change_pass = (pass) => ({
  type: CHANGE_PASS,
  pass: pass,
});

//SIGNUP
export const signup_mail = (email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          console.log("Success to singup");
          return dispatch(signUpSuccess(user));
        }
      })
      .catch((err) => {
        alert(err);
        return dispatch(signUpFailure(err));
      });
  };
};

const signUpSuccess = (values) => ({ type: SIGNUP_SUCCESS, payload: values });
const signUpFailure = (err) => ({ type: SIGNUP_FAILURE, error: err });

//LOGIN
export const login_mail = (email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          return dispatch(loginSuccess(user));
        }
      })
      .catch((err) => {
        alert("err" + err);
        return dispatch(loginFailure(err));
      });
  };
};

export const login_facebook = () => {
  return async (dispatch) => {
    try {
      await Facebook.initializeAsync(facebookConfig["APP_ID"]);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL); // Set persistent auth state
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential); // Sign in wit
        return dispatch(loginSuccess(token));
      } else {
        alert(type);
      }
    } catch (err) {
      alert(err);
      return dispatch(loginFailure(err));
    }
  };
};

//export const login_google = ()=>{
//    return async(dispatch)=>{
//        GoogleSignin.signIn()
//            .then((data)=>{
//                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
//                return firebase.auth().signInWithCredential(credential);
//            })
//            .then((user)=>{
//                return(dispatch(loginSuccess(user)));
//            })
//            .catch((err)=>{
//                console.log(err);
//                return dispatch(loginFailure(err))
//            })
//    }
//}

const loginSuccess = (values) => ({ type: LOGIN_SUCCESS, payload: values });
const loginFailure = (err) => ({ type: LOGOUT_FAILURE, error: err });

//LOGOUT
export const logout = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        dispatch(logoutSuccess());
      })
      .catch((err) => {
        alert(err);
        dispatch(logoutFailure(err));
      });
  };
};
const logoutSuccess = (values) => ({ type: LOGOUT_SUCCESS });
const logoutFailure = (err) => ({ type: LOGOUT_FAILURE, error: err });
