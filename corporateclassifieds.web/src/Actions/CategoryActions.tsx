import { AttributesFetch } from "./AttributesActions";
import { async } from "q";

export const CATEGORIES_FETCH_BEGIN = 'CATEGORIES_FETCH_BEGIN';
export const CATEGORIES_FETCH_SUCCESS = 'CATEGORIES_FETCH_SUCCESS';
export const CATEGORIES_FETCH_ERROR = 'CATEGORIES_FETCH_ERROR';
export const CATEGORY_FETCH_BEGIN = 'CATEGORY_FETCH_BEGIN';
export const CATEGORY_FETCH_SUCCESS = 'CATEGORY_FETCH_SUCCESS';
export const CATEGORY_FETCH_ERROR = 'CATEGORY_FETCH_ERROR';
export const UPSERT_CATEGORY_BEGIN='UPSERT_CATEGORY_BEGIN';
export const UPSERT_CATEGORY_SUCCESS='UPSERT_CATEGORY_SUCCESS';
export const UPSERT_CATEGORY_ERROR='UPSERT_CATEGORY_ERROR';
export const CHANGE_CATEGORY_MODAL_STATUS='CHANGE_CATEGORY_MODAL_STATUS';


// export const CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS';
// export const CATEGORY_DELETE_ERROR = 'CATEGORY_DELETE_ERROR';

export const CategoriesFetchBegin = () => ({
  type: CATEGORIES_FETCH_BEGIN
})
export const CategoriesFetchSuccess = (Categories: any) => ({
  type: CATEGORIES_FETCH_SUCCESS,
  payload: { Categories }
})

export const CategoriesFetchError = (error: any) => ({
  type: CATEGORIES_FETCH_ERROR,
  payload: { error }
})

// export const CategoryDeleteSuccess = (Categories: any) => ({
//   type: CATEGORY_DELETE_SUCCESS,
//   payload: { Categories }
// })

// export const CategoryDeleteError = (error: any) => ({
//   type: CATEGORY_DELETE_ERROR,
//   payload: { error }
// })

export const CategoryFetchBegin = () => ({
  type: CATEGORY_FETCH_BEGIN
})

export const CategoryFetchSuccess = (Category: any) => ({
  type: CATEGORY_FETCH_SUCCESS,
  payload: { Category }
})

export const CategoryFetchError = (error: any) => ({
  type: CATEGORY_FETCH_ERROR,
  payload: { error }
})


export const UpsertCategoryBegin=()=>({
  type:UPSERT_CATEGORY_BEGIN
})

export const UpsertCategorySuccess=()=>({
  type:UPSERT_CATEGORY_SUCCESS
})

export const UpsertCategoryError=(Error:any)=>({
  type:UPSERT_CATEGORY_ERROR,
  payload:{Error}
})


export const ChangeCategoryModalStatus=()=>({
  type:CHANGE_CATEGORY_MODAL_STATUS
})


export function UpsertCategoryByID(Category: any) {
  return async (dispatch: any) => {
    dispatch(UpsertCategoryBegin());
    // alert(Category);
    try {
      const url="https://localhost:44378/api/Category/";
      const response = await fetch(url, {
        method: 'post',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(Category)
      });
      const res=await handleErrors(response);
      dispatch(UpsertCategorySuccess());
    }
    catch(error){
      return dispatch(UpsertCategoryError(error));
    }
  }
}

export function CategoriesFetch() {
  return async (dispatch: any) => {
    dispatch(CategoriesFetchBegin());
    try {
      const url = "https://localhost:44378/api/Category";
      const response = await fetch(url);
      const res = await handleErrors(response);
      const Categories = await res.json();
      dispatch(CategoriesFetchSuccess(Categories));

    }
    catch (error) {
      return dispatch(CategoriesFetchError(error));
    }
  }
}



export function fetchCategoryByID(CategoryID: number) {
  alert(CategoryID);
  return async (dispatch: any) => {
    debugger;
    try {
      dispatch(CategoryFetchBegin());
      const url = "https://localhost:44378/api/Category/" + CategoryID;
      const response = await fetch(url);
      const res = await handleErrors(response);
      const Category = await res.json();
      dispatch(CategoryFetchSuccess(Category));
    }
    catch (error) {
      dispatch(CategoryFetchError(error));
    }
  }
}

export function RemoveCategoryByID(Categoryid: number) {
  return async (dispatch: any) => {
    dispatch(CategoriesFetchBegin());
    debugger;
    try {
      const url = "https://localhost:44378/api/Category/DeleteCategory/" + Categoryid;
      const response = await fetch(url);
      const res = await handleErrors(response);
      const Categories = await res.json();
      dispatch(CategoriesFetchSuccess(Categories));
    }
    catch (error) {
      return dispatch(CategoriesFetchError(error));
    }
  }
}

function handleErrors(response: any) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}