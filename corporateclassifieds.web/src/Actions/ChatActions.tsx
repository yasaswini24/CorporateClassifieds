
export const FETCH_OFFER_CHAT_BEGIN = 'FETCH_OFFER_CHAT_BEGIN';
export const FETCH_OFFER_CHAT_SUCCESS = 'FETCH_OFFER_CHAT_SUCCESS';
export const FETCH_OFFER_CHAT_ERROR = 'FETCH_OFFER_CHAT_ERROR';
export const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';
export const POST_MESSAGE_ERROR = 'POST_MESSAGE_ERROR';

export const fetchOfferChatBegin = () => ({
  type: FETCH_OFFER_CHAT_BEGIN
})

export const fetchOfferChatSuccces = (Chat: any) => ({
  type: FETCH_OFFER_CHAT_SUCCESS,
  payload: { Chat }
})

export const fetchOfferChatError = (error: any) => ({
  type: FETCH_OFFER_CHAT_ERROR,
  payload: { error }
})


export const postMessagesuccess = () => ({
  type: POST_MESSAGE_SUCCESS
})

export const postMessageError = (error: any) => ({
  type: POST_MESSAGE_ERROR,
  payload: { error }
})

export function fetchOfferChat(OfferID: number) {
  return async (dispatch: any) => {
    try {
      dispatch(fetchOfferChatBegin());
      const url = "https://localhost:44378/api/Chat/" + OfferID;
      const response = await fetch(url);
      const res = await handleErrors(response);
      const json = await res.json();
      dispatch(fetchOfferChatSuccces(json));
    }
    catch (error) {
      dispatch(fetchOfferChatError(error));
    }
  }
}

export function postMessage(Chat: any) {
  debugger;
  return async (dispatch: any) => {
    try {
      console.log(Chat);
      const url = "https://localhost:44378/api/Chat";
      const response = await fetch(url, {
        method: 'post',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(Chat)
      });
      const res = await handleErrors(response);
      dispatch(postMessagesuccess());
      dispatch(fetchOfferChat(Chat.OfferID));
      //dispatch(fetchUserOffers(Chat.SenderDetails.ID));
    }
    catch (error) {
      return dispatch(postMessageError(error));
    }
  }
}


export function handleErrors(response: any) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response
}