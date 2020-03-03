import {FETCH_RANKING,FETCH_RANKING_FAILURE,FETCH_RANKING_SUCCESS} from "../actionTypes";

import {apiConfig} from "../../config/api"
import axios from "axios"

const fetchRankingRequest = () => {
  return {
    type: FETCH_RANKING
  }
}
export const fetchRanking = ()=>{
    const id=apiConfig.RAKUTEN_API_ID;
    const affiliateId=apiConfig.AFFILIATEID
    const all_genre_id=apiConfig.ALL_GENRE_ID
    //const url=`https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20170628?format=json&affiliateId=${affiliateId}&page=1&applicationId=${id}&genreId=${all_genre_id}`
    const url=`https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&booksGenreId=001&applicationId=${id}&affiliateId=${affiliateId}`
    //ret
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
