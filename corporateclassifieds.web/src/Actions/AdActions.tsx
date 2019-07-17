import { async } from "q";
import { FetchReports } from "./ReportActions";

export const APPLY_FILTERS = 'APPLY_FILTERS';
export const POST_AD_ERROR = 'POST_AD_ERROR';
export const POST_AD_SUCCESS = 'POST_AD_SUCCESS';
export const FETCH_ADS_BEGIN = 'FETCH_ADS_BEGIN';
export const FETCH_ADS_ERROR = 'FETCH_ADS_ERROR';
export const FETCH_ADS_SUCCESS = 'FETCH_ADS_SUCCESS';
export const FETCH_ACTIVE_ADS_BEGIN = 'FETCH_ACTIVE_ADS_BEGIN';
export const FETCH_ACTIVE_ADS_ERROR = 'FETCH_ACTIVE_ADS_ERROR';
export const FETCH_ACTIVE_ADS_SUCCESS = 'FETCH_ACTIVE_ADS_SUCCESS';
export const FETCH_HISTORY_ADS_BEGIN = 'FETCH_HISTORY_ADS_BEGIN';
export const FETCH_HISTORY_ADS_ERROR = 'FETCH_HISTORY_ADS_ERROR';
export const FETCH_HISTORY_ADS_SUCCESS = 'FETCH_HISTORY_ADS_SUCCESS';
export const FETCH_AD_BY_ID_BEGIN = 'FETCH_AD_BY_ID_BEGIN';
export const FETCH_AD_BY_ID_ERROR = 'FETCH_AD_BY_ID_ERROR';
export const FETCH_AD_BY_ID_SUCCESS = 'FETCH_AD_BY_ID_SUCCESS';
export const CHANGE_DISPLAY_STATUS = 'CHANGE_DISPLAY_STATUS';
export const FETCH_EXPIRED_ADS_BEGIN = 'FETCH_EXPIRED_ADS_BEGIN';
export const FETCH_EXPIRED_ADS_SUCCESS = 'FETCH_EXPIRED_ADS_SUCCESS';
export const FETCH_EXPIRED_ADS_ERROR = 'FETCH_EXPIRED_ADS_ERROR';
export const FETCH_DELETED_ADS_BEGIN = 'FETCH_DELETED_ADS_BEGIN';
export const FETCH_DELETED_ADS_SUCCESS = 'FETCH_DELETED_ADS_SUCCESS';
export const FETCH_DELETED_ADS_ERROR = 'FETCH_DELETED_ADS_ERROR';
export const CLEAR_ADS = 'CLEAR_ADS';
export const CLEAR_ACTIVE_ADS = 'CLEAR_ACTIVE_ADS';
export const CLEAR_HISTORY_ADS = 'CLEAR_HISTORY_ADS';
export const CLEAR_EXPIRED_ADS = 'CLEAR_EXPIRED_ADS';
export const CLEAR_DELETED_ADS = 'CLEAR_DELETED_ADS';
export const CLEAR_REPORTED_ADS = 'CLEAR_REPORTED_ADS';
export const FETCH_REPORTED_ADS_BEGIN = 'FETCH_REPORTED_ADS_BEGIN';
export const FETCH_REPORTED_ADS_SUCCESS = 'FETCH_REPORTED_ADS_SUCCESS';
export const FETCH_REPORTED_ADS_ERROR = 'FETCH_REPORTED_ADS_ERROR';
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const DELETE_AD_BEGIN='DELETE_AD_BEGIN';
export const DELETE_AD_SUCCESS='DELETE_AD_SUCCESS';
export const DELETE_AD_ERROR='DELETE_AD_ERROR';
export const GET_FILTER_LIST = 'GET_FILTER_LIST';


export const fetchAdsBegin = () =>
  ({
    type: FETCH_ADS_BEGIN
  })

export const fetchAdsSuccess = (Ads: any) =>
  ({
    type: FETCH_ADS_SUCCESS,
    payload: { Ads }
  })

export const fetchAdsError = (error: any) =>
  ({
    type: FETCH_ADS_ERROR,
    payload: { error }
  })


export const fetchActiveAdsBegin = () =>
  ({
    type: FETCH_ACTIVE_ADS_BEGIN
  })


export const fetchActiveAdsSuccess = (ActiveAds: any) =>
  ({
    type: FETCH_ACTIVE_ADS_SUCCESS,
    payload: { ActiveAds }
  })

export const fetchActiveAdsError = (error: any) =>
  ({
    type: FETCH_ACTIVE_ADS_ERROR,
    payload: { error }
  })

export const fetchHistoryBegin = () =>
  ({
    type: FETCH_HISTORY_ADS_BEGIN
  })


export const fetchHistorySuccess = (HistoryAds: any) =>
  ({
    type: FETCH_HISTORY_ADS_SUCCESS,
    payload: { HistoryAds }
  })

export const fetchHistoryError = (error: any) =>
  ({
    type: FETCH_HISTORY_ADS_ERROR,
    payload: { error }
  })



export const postAdError = () => ({
  type: POST_AD_ERROR
})


export const postAdSuccess = () => ({
  type: POST_AD_SUCCESS
})


export function applyFilters(selectedList: any) {

}

export const changeview = (ViewID: number) => ({
  type: CHANGE_VIEW,
  payload: { ViewID }
})

export const fetchAdByIDBegin = () => ({
  type: FETCH_AD_BY_ID_BEGIN
})

export const fetchAdByIDSuccess = (Ad: any) => ({
  type: FETCH_AD_BY_ID_SUCCESS,
  payload: { Ad }
})

export const fetchAdByIDError = (error: any) => ({
  type: FETCH_AD_BY_ID_ERROR,
  error: { error }
})

export const changeDisplayAd = (active: number) => ({
  type: CHANGE_DISPLAY_STATUS,
  payload: { active }
})

export const fetchExpiredAdsBegin = () => ({
  type: FETCH_EXPIRED_ADS_BEGIN
})

export const fetchExpiredAdsSuccess = (ExpiredAds: any) => ({
  type: FETCH_EXPIRED_ADS_SUCCESS,
  payload: { ExpiredAds }
})

export const fetchExpiredAdsError = (error: any) => ({
  type: FETCH_EXPIRED_ADS_ERROR,
  payload: { error }
})

export const fetchDeletedAdsBegin = () => ({
  type: FETCH_DELETED_ADS_BEGIN
})

export const fetchDeletedAdsSuccess = (DeletedAds: any) => ({
  type: FETCH_DELETED_ADS_SUCCESS,
  payload: { DeletedAds }
})

export const fetchDeletedAdsError = (error: any) => ({
  type: FETCH_DELETED_ADS_ERROR,
  payload: { error }
})

export const DeleteAdBegin=()=>({
  type:DELETE_AD_BEGIN
})

export const DeleteAdSuccess=()=>({
  type:DELETE_AD_SUCCESS
})

export const DeleteAdError=(error:any)=>({
  type:DELETE_AD_ERROR,
  payload:{error}
})

export const fetchReportedAdsBegin = () => ({
  type: FETCH_REPORTED_ADS_BEGIN
})

export const fetchReportedAdsSuccess = (ReportedAds: any) => ({
  type: FETCH_REPORTED_ADS_SUCCESS,
  payload: { ReportedAds }
})

export const fetchReportedAdsError = (error: any) => ({
  type: FETCH_REPORTED_ADS_ERROR,
  payload: { error }
})

export function clear(componentName: string) {
  if (componentName == "Classifieds")
    return {
      type: CLEAR_ADS
    }
  else if (componentName == "ActiveClassifieds")
    return {
      type: CLEAR_ACTIVE_ADS
    }
  else if (componentName == "History")
    return {
      type: CLEAR_HISTORY_ADS
    }
  else if (componentName == "Expired")
    return {
      type: CLEAR_EXPIRED_ADS
    }
  else if (componentName == "Reported")
    return {
      type: CLEAR_REPORTED_ADS
    }
  else
    return {
      type: CLEAR_DELETED_ADS
    }
}


export function fetchUserAds(userID: number, StatusCode: string, start: number) {
  debugger;
  return async (dispatch: any) => {
    if (StatusCode == "Active") {
      dispatch(fetchActiveAdsBegin());
    }
    else if (StatusCode == "History") {
      dispatch(fetchHistoryBegin());
    }
    else if (StatusCode == "Expired") {
      dispatch(fetchExpiredAdsBegin());
    }
    else if (StatusCode == "Reported") {
      dispatch(fetchReportedAdsBegin());
    }
    else {
      dispatch(fetchDeletedAdsBegin());
    }
    try {
      
      var length = 10
      const url = "https://localhost:44378/api/Ads/GetAdsByUserID/" + userID + "/" + StatusCode + "/" + start + "/" + (start + length);
      const response = await fetch(url);
      const res = await handleErrors(response);
      const json = await res.json();
      if (StatusCode == "Active") {
        dispatch(fetchActiveAdsSuccess(json));
      }
      else if (StatusCode == "History") {
        dispatch(fetchHistorySuccess(json));
      }
      else if (StatusCode == "Expired") {
        dispatch(fetchExpiredAdsSuccess(json));
      }
      else if (StatusCode == "Reported") {
        dispatch(fetchReportedAdsSuccess(json));
      }
      else {
        dispatch(fetchDeletedAdsSuccess(json));
      }
    }
    catch (error) {
      if (StatusCode == "Active") {
        dispatch(fetchActiveAdsError(error));
      }
      else if (StatusCode == "History") {
        dispatch(fetchHistoryError(error));
      }
      else if (StatusCode == "Expired") {
        dispatch(fetchExpiredAdsError(error));
      }
      else if (StatusCode == "Reported") {
        dispatch(fetchReportedAdsError(error));
      }
      else {
        dispatch(fetchDeletedAdsError(error));
      }
    }
  }
}

export function fetchAdByID(AdID: number) {
  return async (dispatch: any) => {
    dispatch(fetchAdByIDBegin());
    debugger;
    try {
      const url = "https://localhost:44378/api/Ads/" + AdID;
      const url1="https://localhost:44378/api/Ads/IncreaseView/"+AdID;
      const response1=await fetch(url1);
      const response = await fetch(url);
      const res = await handleErrors(response);
      const json = await res.json();
      dispatch(fetchAdByIDSuccess(json));

    }
    catch (error) {
      dispatch(fetchAdByIDError(error));
    }
  }
}

export function postAd(AdDetails: any) {
  console.log(JSON.stringify(AdDetails));
  return async (dispatch: any) => {
    try {
      const url = "https://localhost:44378/api/Ads";
      const response = await fetch(url, {
        method: 'post',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(AdDetails)
      });
      const res = await handleErrors(response);
      dispatch(postAdSuccess());
    }
    catch (error) {
      return dispatch(postAdError());
    }
  }
}

export function DeleteAd(AdID:number,userID:number){
  return async (dispatch:any)=>{
    try{
      debugger;
      dispatch(DeleteAdBegin());
      const url="https://localhost:44378/api/Ads/DeleteAdByID/"+AdID+"/"+userID;
      const response=await fetch(url,{
        method:'delete'
      });
      const res=await handleErrors(response);
      dispatch(DeleteAdSuccess());
      dispatch(FetchReports());
    }
    catch(error){
      dispatch(DeleteAdError(error));
    }
  }
}

// export function fetchAds(start: number) {
//   return async (dispatch: any) => {
//     // if (start == 0) {
//     //   dispatch(fetchStartAdsBegin());
//     // }
//     // else {
//     dispatch(fetchAdsBegin());
//     // }
//     try {
//       // debugger;
//       var length = 10
//       const response = await fetch("https://localhost:44378/api/Ads/" + start + "/" + (start + length));
//       console.log(response);
//       const res = await handleErrors(response);
//       const json = await res.json();
//       dispatch(fetchAdsSuccess(json));
//     }
//     catch (error) {
//       return dispatch(fetchAdsError(error));
//     }
//   };
// }


export function fetchAds(FilterList: object) {
  return async (dispatch: any) => {
    // if (start == 0) {
    //   dispatch(fetchStartAdsBegin());
    // }
    // else {
    dispatch(fetchAdsBegin());
    // }
    try {
      debugger;
      console.log(FilterList);
      const response = await fetch("https://localhost:44378/api/Ads/GetAllAds", {
        method: 'post',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(FilterList),
      });
      console.log(response);
      const res = await handleErrors(response);
      const json = await res.json();
      dispatch(fetchAdsSuccess(json));
    }
    catch (error) {
      return dispatch(fetchAdsError(error));
    }
  };
}

export const getFilterList = (FilterList: object) => ({
  type: GET_FILTER_LIST,
  payload: {FilterList}
})
export function filterList(FilterList: object){
  return async (dispatch: any) => {
    dispatch(getFilterList(FilterList));
  }
}



// Handle HTTP errors since fetch won't.
function handleErrors(response: any) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}




