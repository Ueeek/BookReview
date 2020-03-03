import { ADD_BOOKLIST, DELETE_BOOKLIST} from "../actionTypes";
export const addBook = content => ({
  type: ADD_BOOKLIST,
  payload: {
    content
  }
});

export const deleteBook = content => ({
    type: DELETE_BOOKLIST,
    payload: {
        content
    }
});

