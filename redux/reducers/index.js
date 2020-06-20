import { combineReducers } from "redux";
import bookList from "./bookList";
import bookRanking from "./BookRanking";
import Login from "./Login";

export default combineReducers({ bookList, bookRanking, Login });
