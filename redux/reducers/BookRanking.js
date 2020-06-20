import {
  FETCH_RANKING,
  FETCH_RANKING_FAILURE,
  FETCH_RANKING_SUCCESS,
} from "../actionTypes";
const initialState = {
  rankingList: [],
  error: "",
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_RANKING: {
      return {
        ...state,
        ...initialState,
        loading: true,
      };
    }
    case FETCH_RANKING_SUCCESS: {
      return {
        ...state,
        ...initialState,
        rankingList: action.payload,
      };
    }
    case FETCH_RANKING_FAILURE: {
      return {
        ...state,
        ...initialState,
        error: "fail fetchnig",
      };
    }

    default:
      return state;
  }
}
