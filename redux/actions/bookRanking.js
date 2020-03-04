import {FETCH_RANKING,FETCH_RANKING_FAILURE,FETCH_RANKING_SUCCESS} from "../actionTypes";

import {apiConfig} from "../../config/api"
import axios from "axios"

const fetchRankingRequest = () => {
  return {
    type: FETCH_RANKING
  }
}
export const fetchRanking = (genre)=>{
    const id=apiConfig.RAKUTEN_API_ID;
    const affiliateId=apiConfig.AFFILIATEID
    const url=`https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&booksGenreId=${genre}&applicationId=${id}&affiliateId=${affiliateId}`
    return async (dispatch) => {
    dispatch(fetchRankingRequest())
    try {
      const res = await axios.get(url);
      return dispatch(fetchRankingSuccess(res.data.Items));
    }
    catch (err) {
      return dispatch(fetchRankingFailure(err));
    }
    }
};

const fetchRankingSuccess = (values) => (
    {type: FETCH_RANKING_SUCCESS, payload: values }
);
const fetchRankingFailure = () => (
    { type: FETCH_RANKING_FAILURE }
);
