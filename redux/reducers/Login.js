import {LOGIN_MAIL,LOGOUT,SIGNUP_MAIL} from "../actionTypes"

import firebase from "firebase"
import{ firebaseConfig} from "../../config/firebase"

const initialState = {
    user:null,
}

export default function(state = initialState, action) {
  console.log("action_rank->",action.type)
  switch (action.type) {
      case SIGNUP_MAIL:{
          return{
              ...state,user:action.payload
          }
      }
      case LOGIN_MAIL:{
          return{
              ...state,user:action.payload
          }
      }
      case LOGOUT:{
          return{
              ...initialState
          }
      }
    default:
      return state;
  }
}


