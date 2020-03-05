import {
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} from "../actionTypes"
import firebase from "firebase"

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

const loginSuccess = (values) => (
    {type: LOGIN_SUCCESS, payload: values }
);
const loginFailure = (err) => (
    { type: LOGOUT_FAILURE,error:err}
);

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
