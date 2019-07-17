import { FETCH_USERS_BEGIN, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR, UPSERT_USER_ERROR, UPSERT_USER_SUCCESS, CHANGE_USERS_MODAL_STATUS, VALIDATE_USER_BEGIN, VALIDATE_USER_SUCCESS, VALIDATE_USER_ERROR, USER_SIGNUP_SUCCESS, USER_SIGNUP_ERROR, USER_SIGNUP_BEGIN, FETCH_USERNAME_SUCCESS, FETCH_USERNAME_ERROR } from "../Actions/UserActions";

const intialstate = {
    Users: [],
    UserFetchError: false,
    UserFetchErrorInfo: "",
    loading: false,
    UpsertUserSuccess: false,
    UpsertError: false,
    UpsertErrorInfo: "",
    UserLoggedIn: false,
    User: [],
    Login: false,
    UserLogInError: false,
    SignUp: false,
    SignUpSuccess: false,
    SignUpError: false,
    SignUpErrorInfo: "",
    UserExists: false,
};

export default function UserReducer(state = intialstate, action: any) {
    switch (action.type) {

        case FETCH_USERS_BEGIN:
            return {
                ...state,
                Users: [],
                loading: true
            }

        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                Users: action.payload.Users,
                loading: false,
                UserFetchError: false
            }

        case FETCH_USERS_ERROR:
            return {
                ...state,
                Users: [],
                loading: false,
                UserFetchError: true,
                UserFetchErrorInfo: action.payload.error
            }

        case UPSERT_USER_SUCCESS:
            return {
                ...state,
                UpsertUserSuccess: true,
                UpsertError: false
            }

        case UPSERT_USER_ERROR:
            return {
                ...state,
                UpsertError: true,
                UpsertErrorInfo: action.payload.error
            }

        case CHANGE_USERS_MODAL_STATUS:
            return {
                ...state,
                UpsertUserSuccess: false
            }

        case VALIDATE_USER_BEGIN:
            return {
                ...state,
                User: [],
                Login: true,
                SignUp: false
            }

        case VALIDATE_USER_SUCCESS:
            return {
                ...state,
                User: action.payload.UserDetails,
                UserLoggedIn: true,
                Login: false,
                UserLogInError: false,
            }

        case VALIDATE_USER_ERROR:
            return {
                ...state,
                User: [],
                Login: true,
                UserLoggedIn: false,
                UserLogInError: true
            }

        case USER_SIGNUP_BEGIN:
            return {
                ...state,
                SignUp: true,
                SignUpSuccess: false
            }

        case USER_SIGNUP_SUCCESS:
            return {
                ...state,
                SignUp: false,
                SignUpSuccess: true,
                SignUpError: false,
                UserLoggedIn: false
            }

        case USER_SIGNUP_ERROR:
            return {
                ...state,
                SignUp: true,
                SignUpSuccess: false,
                SignUpError: true,
                SignUpErrorInfo: action.payload.error,
                UserLoggedIn: false
            }

        case FETCH_USERNAME_SUCCESS:
            return {
                ...state,
                UserExists: true
            }

        case FETCH_USERNAME_ERROR:
            return {
                ...state,
                UserExists: false
            }

        default:
            return state;
    }
}