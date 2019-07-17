import { CATEGORY_FETCH_SUCCESS, CATEGORY_FETCH_ERROR, CATEGORY_FETCH_BEGIN, CATEGORIES_FETCH_BEGIN, CATEGORIES_FETCH_ERROR, CATEGORIES_FETCH_SUCCESS, UPSERT_CATEGORY_BEGIN, UPSERT_CATEGORY_SUCCESS, UPSERT_CATEGORY_ERROR, CHANGE_CATEGORY_MODAL_STATUS } from "../Actions/CategoryActions";

const initialstate = {
    Categories: [],
    CategoriesError: false,
    CategoriesFetchErrorInfo: "",
    Category: [],
    CategoryError: false,
    CategoryFetchErrorInfo: "",
    Attributes: [],
    UpsertCategorySuccess: false,
    UpsertCategoryError: false,
    UpsertCategoryErrrorInfo: ""
}

export default function CategoriesReducer(state = initialstate, action: any) {
    switch (action.type) {
        case CATEGORIES_FETCH_BEGIN:
            return {
                ...state,
                Categories: []
            }
        case CATEGORIES_FETCH_SUCCESS:
            debugger;
            return {
                ...state,
                Categories: action.payload.Categories
            }
        case CATEGORIES_FETCH_ERROR:
            return {
                ...state,
                CategoriesError: true,
                CategoriesFetchErrorInfo: action.payload.error
            }

        case CATEGORY_FETCH_BEGIN:
            debugger;
            return {
                ...state,
                Category: [],
                Attributes: [],
                CategoryError: false
            }

        case CATEGORY_FETCH_SUCCESS:
            debugger;
            return {
                ...state,
                Category: action.payload.Category,
                Attributes: action.payload.Category.attributes
            }

        case CATEGORY_FETCH_ERROR:
            return {
                ...state,
                CategoryError: true,
                CategoryFetchErrorInfo: action.payload.error
            }

        case UPSERT_CATEGORY_BEGIN:
            return {
                ...state,
                UpsertCategorySuccess: false,
                UpsertCategoryError: false
            }

        case UPSERT_CATEGORY_SUCCESS:
            return {
                ...state,
                UpsertCategorySuccess: true,
                UpsertCategoryError: false
            }

        case UPSERT_CATEGORY_ERROR:
            return {
                ...state,
                UpsertCategorySuccess: false,
                UpsertCategoryError: true,
                UpsertCategoryErrrorInfo: action.payload.Error
            }

        case CHANGE_CATEGORY_MODAL_STATUS:
            return {
                ...state,
                UpsertCategorySuccess: false
            }

        default:
            return {
                ...state
            }
    }
}