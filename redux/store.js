import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const middlewares = [thunk];

const configureStore = (initialState) => {
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  return store;
};

export default configureStore();
