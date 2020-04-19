import { ADD_BOOKLIST,FETCH_BOOKLIST,FETCH_BOOKLIST_FAILURE,FETCH_BOOKLIST_SUCCESS,DELETE_BOOKLIST} from "../actionTypes";
import {fetch_books,delete_Content,set_Content} from "../../firebase"
import{Toast} from "native-base"

const initialState = {
    bookList: [],
    loading:false,
    error:"",
}
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOKLIST: {
      const {content} = action.payload;
      console.log("add=>",content);
      set_Content(content);
      Toast.show({
          text:"book"+content.title+"is added to List!",
          type:"success",
          position:"bottom"
      });
        return{state}
    }
      case DELETE_BOOKLIST:{
          const {content} = action.payload;
          delete_Content(content);
          Toast.show({
            text:"book"+content.title+"is deleted from list",
            type:"danger",
            position:"bottom"
          });
          return{state}
      }
    case FETCH_BOOKLIST:{
        return{...initialState,...state,loading:true}
    }
    case FETCH_BOOKLIST_SUCCESS:{
        const data = action.payload;
        console.log("FETCHBOOKLISTSUCCESS")
        console.log("data=>",data.length);
        console.log("data=>",data);
        return{
            ...state,
            bookList:data
        }
    }
    case FETCH_BOOKLIST_FAILURE:{
        console.log("FETCHBOOKLISTFAILURE")
        console.log(action.payload);
        const {err} = action.payload;
        return{
            ...initialState,error:err
        }
    }

    default:
          console.log("rank default called")
      return state;
  }
}


