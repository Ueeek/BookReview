import { ADD_BOOK,GET_BOOKS,DELETE_BOOK} from "../actionTypes";
const initialState = {
    bookList: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOK: {
      const {content} = action.payload;
        console.log("ADD called")
        console.log("content",content)
      return {
        ...state,
          bookList:[...state.bookList.filter((v,i)=>v!=content),content],
      };
    }
      case DELETE_BOOK:{
          const {content} = action.payload;
          return{
              ...state,
              bookList:[...state.bookList.filter((v,i)=>v!=content)],
          };
      }
    default:
      console.log("default called")
      return state;
  }
}


