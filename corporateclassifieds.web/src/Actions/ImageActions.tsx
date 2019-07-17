
export const FETCH_IMAGE_SUCCESS = 'FETCH_IMAGE_SUCCESS';
export const FETCH_IMAGE_ERROR = 'FETCH_IMAGE_ERROR';
export const FETCH_IMAGE_BEGIN = 'FETCH_IMAGE_BEGIN';

export const fetchImageBegin = () => ({
  type: FETCH_IMAGE_BEGIN
})


export const fetchImageSuccess = (Images: any) => ({
  type: FETCH_IMAGE_SUCCESS,
  payload: { Images }
})

export const fetchImageError = (error: any) => ({
  type: FETCH_IMAGE_ERROR,
  payload: { error }
})

export function fetchImagesOfAd(id: number) {
  return async (dispatch: any) => {
    dispatch(fetchImageBegin());
    try {
      const response = await fetch("https://localhost:44378/api/Ads/image/" + id,
        {
          method: 'GET'
        });
      const res = await handleErrors(response);
      const json = await res.json();
      dispatch(fetchImageSuccess(json));
    }
    catch (error) {
      return dispatch(fetchImageError(error));
    }
  };
}

function handleErrors(response: any) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}