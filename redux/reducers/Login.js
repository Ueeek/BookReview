import {LOGIN,LOGOUT} from "../actionTypes"

import{ firebaseConfig} from "../../config/firebase"

const initialState = {
    user:null,
}

export default function(state = initialState, action) {
  console.log("action_rank->",action.type)
  switch (action.type) {
      case LOGIN:{
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


