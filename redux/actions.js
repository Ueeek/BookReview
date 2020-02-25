import { ADD_BOOK} from "./actionTypes";
export const addBook = content => ({
  type: ADD_BOOK,
  payload: {
    content
  }
});

