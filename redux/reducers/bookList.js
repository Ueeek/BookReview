import {
  ADD_BOOKLIST,
  FETCH_BOOKLIST,
  FETCH_BOOKLIST_FAILURE,
  FETCH_BOOKLIST_SUCCESS,
  DELETE_BOOKLIST,
} from "../actionTypes";
import { delete_Content, set_Content } from "../../firebase";
import { Toast } from "native-base";

const initialState = {
  bookList: [],
  loading: false,
  error: "",
};
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOKLIST: {
      const { content } = action.payload;
      set_Content(content);
      Toast.show({
        text: "book" + content.title + "is added to List!",
        type: "success",
        position: "bottom",
      });
      return { state };
    }
    case DELETE_BOOKLIST: {
      const { content } = action.payload;
      delete_Content(content);
      Toast.show({
        text: "book" + content.title + "is deleted from list",
        type: "danger",
        position: "bottom",
      });
      return { state };
    }
    case FETCH_BOOKLIST: {
      return { ...initialState, ...state, loading: true };
    }
    case FETCH_BOOKLIST_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        bookList: data,
      };
    }
    case FETCH_BOOKLIST_FAILURE: {
      console.log(action.payload);
      const { err } = action.payload;
      return {
        ...initialState,
        error: err,
      };
    }

    default:
      return state;
  }
}
