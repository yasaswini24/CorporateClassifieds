export const ATTRIBUTES_FETCH_BEGIN='ATTRIBUTES_FETCH_BEGIN';
export const ATTRIBUTES_FETCH_SUCCESS='ATTRIBUTES_FETCH_SUCCESS';
export const ATTRIBUTES_FETCH_ERROR='ATTRIBUTES_FETCH_ERROR';


export const AttributeFetchBegin=()=>({
    type:ATTRIBUTES_FETCH_BEGIN
})
export const AttributeFetchSuccess = (Attributes: any) => ({
    type: ATTRIBUTES_FETCH_SUCCESS,
    payload: { Attributes }
})

export const AttributeFetchError = (error: any) => ({
    type: ATTRIBUTES_FETCH_ERROR,
    payload: { error }
})

export function AttributesFetch(id: number) {
    return async (dispatch: any) => {
        debugger;
        try {
            const url = "https://localhost:44378/api/Category/" + id;
            const response = await fetch(url);
            const res = await handleErrors(response);
            const Category = await res.json();
            dispatch(AttributeFetchSuccess(Category.attributes));
        }
        catch (error) {
            return dispatch(AttributeFetchError(error));
        }
    }
}

function handleErrors(response: any) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}