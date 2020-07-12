import {
  FETCH_BOOKLIST,
  FETCH_BOOKLIST_SUCCESS,
  FETCH_BOOKLIST_FAILURE,
  ADD_BOOKLIST,
  DELETE_BOOKLIST,
} from "../actionTypes";
import { fetch_books } from "../../firebase";

export const addBook = (content) => ({
  type: ADD_BOOKLIST,
  payload: {
    content,
  },
});

export const deleteBook = (content) => ({
  type: DELETE_BOOKLIST,
  payload: {
    content,
  },
});

const fetchBookListRequest = () => {
  return {
    type: FETCH_BOOKLIST,
  };
};

export const fetchBookList = () => {
  return async (dispatch) => {
    dispatch(fetchBookListRequest());
    try {
      const querySnapshot = await fetch_books();
      let ret = [];
      querySnapshot.forEach((postDoc) => {
        ret.push(postDoc.data());
      });
      return dispatch(fetchBookListSuccess(ret));
    } catch (err) {
      return dispatch(fetchBookListFailure(err));
    }
  };
};
const fetchBookListSuccess = (content) => ({
  type: FETCH_BOOKLIST_SUCCESS,
  payload: content,
});
const fetchBookListFailure = (err) => ({
  type: FETCH_BOOKLIST_FAILURE,
  payload: err,
});

export const sortList = (sortKey) => ({
  type: SORT_LIST,
  sortKey,
});
