import { ADD_BOOKLIST,FETCH_BOOKLIST,FETCH_BOOKLIST_FAILURE,FETCH_BOOKLIST_SUCCESS,DELETE_BOOKLIST} from "../actionTypes";
const initialState = {
    bookList: [],
    loading:false,
    error:"",
}

export default function(state = initialState, action) {
  console.log("book List=>",action.type)
  switch (action.type) {
    case ADD_BOOKLIST: {
      const {content} = action.payload;
      alert("book:"+content.title+"is added to List!")
      return {
        ...state,
          bookList:[...state.bookList.filter((v,i)=>v!=content),content],
      };
    }
      case DELETE_BOOKLIST:{
          const {content} = action.payload;
          return{
              ...state,
              bookList:[...state.bookList.filter((v,i)=>v!=content)],
          };
      }
    case FETCH_BOOKLIST:{
        return{...initialState,...state,lloading:true}
    }
    case FETCH_BOOKLIST_SUCCESS:{
        const {content} = action.payload;
        return{
            ...state,
            bookList:{...initialState, bookList:content.payload}
        }
    }
    case FETCH_BOOKLIST_FAILURE:{
        const {content} = action.payload;
        return{
            ...initialState,error:content
        }
    }

    default:
          console.log("rank default called")
      return state;
  }
}


