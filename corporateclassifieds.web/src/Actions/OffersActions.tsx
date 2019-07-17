export const FETCH_OFFERS_BEGIN = 'FETCH_OFFERS_BEGIN';
export const FETCH_OFFERS_SUCCESS = 'FETCH_OFFERS_SUCCESS';
export const FETCH_OFFERS_ERROR = 'FETCH_OFFERS_ERROR';
export const POST_OFFER_ERROR = 'POST_OFFER_ERROR';
export const POST_OFFER_SUCCESS = 'POST_OFFER_SUCCESS';

export const fetchOffersBegin = () => ({
  type: FETCH_OFFERS_BEGIN
})


export const fetchOffersSuccess = (Offers: any) => ({
  type: FETCH_OFFERS_SUCCESS,
  payload: { Offers }
})

export const fetchOffersError = (error: any) => ({
  type: FETCH_OFFERS_ERROR,
  payload: { error }
})

export const postOfferError = () => ({
  type: POST_OFFER_ERROR
})


export const postOffersuccess = () => ({
  type: POST_OFFER_SUCCESS
})

export function fetchUserOffers(userID: number) {
  return async (dispatch: any) => {
    debugger;
    dispatch(fetchOffersBegin());
    try {
      const url = "https://localhost:44378/api/Offers/" + userID;
      const response = await fetch(url);
      debugger;
      const res = await handleErrors(response);
      const json = await res.json();
      dispatch(fetchOffersSuccess(json));
    }
    catch (error) {
      debugger;
      dispatch(fetchOffersError(error));
    }
  }
}


export function postOffer(OfferDetails: any) {
  debugger;
  return async (dispatch: any) => {
    try {
      const url = "https://localhost:44378/api/Offers";
      const response = await fetch(url, {
        method: 'post',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(OfferDetails)
      });
      const res = await handleErrors(response);
      dispatch(postOffersuccess());
    }
    catch (error) {
      return dispatch(postOfferError());
    }
  }
}



// export function postOfferMessage(Chat: any) {
//   debugger;
//   return async (dispatch: any) => {
//     try {
//       console.log(Chat);
//       const url = "https://localhost:44378/api/Chat";
//       const response = await fetch(url, {
//         method: 'post',
//         headers: new Headers({ 'content-type': 'application/json' }),
//         body: Chat
//       });
//       const res = await handleErrors(response);
//       dispatch(postOffersuccess());
//       //dispatch(fetchUserOffers(Chat.SenderDetails.ID));
//     }
//     catch (error) {
//       return dispatch(postOfferError());
//     }
//   }
// }


// Handle HTTP errors since fetch won't.
function handleErrors(response: any) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}




