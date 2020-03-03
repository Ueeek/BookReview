import { ADD_BOOK,GET_BOOKS,DELETE_BOOK} from "../actionTypes";
const initialState = {
    bookList: []
}

export default function(state = initialState, action) {
  console.log("book List=>",action.type)
  switch (action.type) {
    case ADD_BOOK: {
      const {content} = action.payload;
      alert("book:"+content.title+"is added to List!")
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
          console.log("rank default called")
      return state;
  }
}


