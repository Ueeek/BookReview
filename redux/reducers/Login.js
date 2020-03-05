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

const initialState = {
    user:null,
    error:"",
    name:"",
    pass:"",
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
      case CHANGE_PASS:{
          return{
              ...state,pass:action.pass
          }
      }
      case CHANGE_NAME:{
          return{
              ...state,name:action.name
          }
      }
    default:
      return state;
  }
}


