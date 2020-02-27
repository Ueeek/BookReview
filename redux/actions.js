import { ADD_BOOK, DELETE_BOOK} from "./actionTypes";
export const addBook = content => ({
  type: ADD_BOOK,
  payload: {
    content
  }
});

export const deleteBook = content => ({
    type: DELETE_BOOK,
    payload: {
        content
    }
});

