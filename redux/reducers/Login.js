import {
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS
    ,LOGOUT_FAILURE
} from "../actionTypes"

const initialState = {
    user:null,
    error:"",
}

export default function(state = initialState, action) {
  console.log("action_rank->",action.type)
  switch (action.type) {
      case SIGNUP_SUCCESS:{
          return{
              ...state,user:action.payload
          }
      }
      case SIGNUP_FAILURE:{
          return{
              ...state,error:action.error
          }
      }
      case LOGIN_FAILURE:{
          return{
              ...state,error:action.error
          }
      }
      case LOGIN_SUCCESS:{
          return{
              ...state,user:action.payload
          }
      }
      case LOGOUT_FAILURE:{
          return{
              ...state,error:action.error
          }
      }
      case LOGOUT_SUCCESS:{
          return{
              ...initialState
          }
      }
    default:
      return state;
  }
}


