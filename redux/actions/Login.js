import {
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    CHANGE_NAME,
    CHANGE_PASS,

} from "../actionTypes"
import firebase from "firebase"
import {facebookConfig } from "../../config/facebook"
import * as Facebook from "expo-facebook"


export const change_name=(name)=>({
    type:CHANGE_NAME,name:name
})

export const change_pass=(pass)=>({
    type:CHANGE_PASS,pass:pass
})

//SIGNUP
export const signup_mail = (email,password)=>{
    return (dispatch)=>{
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user=>{
            if(user){
                console.log("Success to singup")
                return dispatch(signUpSuccess(user))
            }
        })
        .catch(err=>{
            console.log("err->",err)
            alert(err)
            return dispatch(signUpFailure(err))
        })
    }
}

const signUpSuccess = (values) => (
    {type: SIGNUP_SUCCESS, payload: values }
);
const signUpFailure = (err) => (
    { type:SIGNUP_FAILURE,error:err}
);

//LOGIN
export const login_mail = (email,password)=>{
    return (dispatch)=>{
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user=>{
            if(user){
                console.log("Success to login")
                return dispatch(loginSuccess(user))
            }
        })
        .catch(err=>{
            console.log("err->",err)
            alert("err"+err)
            return dispatch(loginFailure(err))
        })
    }
}

export const login_facebook = ()=>{
        return async(dispatch)=>{
        try{
            const { type , token } = await Facebook.logInWithReadPermissionsAsync(facebookConfig["APP_ID"],{permissions:['public_profile']});
            if(type ==="success"){
                 await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
                 const credential = firebase.auth.FacebookAuthProvider.credential(token);
                 const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in wit
                 return dispatch(loginSuccess(token))
            }
            else{
                const credential = firebase.auth().FacebookAuthProvider.credential(token);
                firebase.auth().signInWithCredential(credential).catch((error) => {
                console.log(error)
              })
            }
        }
        catch(err){
            console.log(err)
            alert(err)
        }
    }
}

const loginSuccess = (values) => (
    {type: LOGIN_SUCCESS, payload: values }
);
const loginFailure = (err) => (
    { type: LOGOUT_FAILURE,error:err}
);

//LOGOUT
export const logout = ()=>{
    return (dispatch)=>{
        firebase.auth().signOut()
         .then(res=>{
             console.log("sucsess to logout")
             dispatch(logoutSuccess())
         })
        .catch(err=>{
            console.log("err=>",err)
            alert(err)
             dispatch(logoutFailure(err))
        })
    }
}
const logoutSuccess = (values) => (
    {type: LOGOUT_SUCCESS}
);
const logoutFailure = (err) => (
    { type: LOGOUT_FAILURE,error:err}
);
