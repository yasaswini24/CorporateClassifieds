export const VALIDATE_USER_BEGIN = 'VALIDATE_USER_BEGIN';
export const VALIDATE_USER_SUCCESS = 'VALIDATE_USER_SUCCESS';
export const VALIDATE_USER_ERROR = 'VALIDATE_USER_ERROR';
export const FETCH_USERS_BEGIN = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
export const UPSERT_USER_SUCCESS = 'UPSERT_USER_SUCCESS';
export const UPSERT_USER_ERROR = 'UPSERT_USER_ERROR';
export const CHANGE_USERS_MODAL_STATUS = 'CHANGE_USERS_MODAL_STATUS';
export const USER_SIGNUP_BEGIN='USER_SIGNUP_BEGIN';
export const USER_SIGNUP_ERROR = 'USER_SIGNUP_ERROR';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const FETCH_USERNAME_ERROR='FETCH_USERNAME_ERROR';
export const FETCH_USERNAME_SUCCESS='FETCH_USERNAME_SUCCESS';
// export const USER_SIGNIN_ERROR='USER_SIGNIN_ERROR'


export const ValidateUserBegin = () => ({
    type: VALIDATE_USER_BEGIN
})
export const ValidateUserSuccess = (UserDetails: any) => ({
    type: VALIDATE_USER_SUCCESS,
    payload: { UserDetails }
})
export const ValidateUserError = (Error: any) => ({
    type: VALIDATE_USER_ERROR,
    payload: { Error }
})

export const fetchUsersBegin = () => ({
    type: FETCH_USERS_BEGIN
})

export const fetchUsersSuccess = (Users: any) => ({
    type: FETCH_USERS_SUCCESS,
    payload: { Users }
})

export const fetchUsersError = (error: any) => ({
    type: FETCH_USERS_ERROR,
    payload: { error }
})

export const UpsertUserSuccess = () => ({
    type: UPSERT_USER_SUCCESS
})

export const UpsertUserError = (error: any) => ({
    type: UPSERT_USER_ERROR,
    payload: { error }
})

export const ChangeUsersModalStatus = () => ({
    type: CHANGE_USERS_MODAL_STATUS
})

export const UserSignUpBegin=()=>({
    type:USER_SIGNUP_BEGIN
})

export const UserSignUpSuccess = () => ({
    type: USER_SIGNUP_SUCCESS
})

export const UserSignUpError = (error: any) => ({
    type: USER_SIGNUP_ERROR,
    payload: { error }
})

// export const UserSignInBegin=()=>({
//     type:USER_SIGNIN_BEGIN
// })

export const FetchUserNameSuccess=()=>({
    type:FETCH_USERNAME_SUCCESS
})

export const FetchUserNameError=()=>({
    type:FETCH_USERNAME_ERROR
})

export const ValidateCredentials = (Credentials: any) => {
    return async (dispatch: any) => {
        
        try {
            const url = "https://localhost:44378/api/User/Validate/";
            const res = await fetch(url, {
                method: 'post',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: JSON.stringify(Credentials)
            });
            const response = await handleError(res);
            const json = await response.json();
            dispatch(ValidateUserSuccess(json));
        }
        catch (error) {
            return dispatch(ValidateUserError(error));
        }
    }
}

export const CheckUserName=(Username:string)=>{
    return async (dispatch:any)=>{
        try{
            debugger;
            const url="https://localhost:44378/api/User/FindUser/"+Username;
            const response=await fetch(url,{
                method:'post'
            });
            const res=await handleError(response);
            dispatch(FetchUserNameSuccess());
        }
        catch(error){
            dispatch(FetchUserNameError());
        }
    }
}

export const FetchUsers = () => {
    return async (dispatch: any) => {
        dispatch(fetchUsersBegin());
        try {
            const url = "https://localhost:44378/api/User";
            const res = await fetch(url);
            const response = await handleError(res);
            const json = await response.json();
            dispatch(fetchUsersSuccess(json));
        }
        catch (error) {
            dispatch(fetchUsersError(error));
        }
    }
}


export const UpsertUser = (UsersList: any) => {
    return async (dispatch: any) => {
        try {
            const url = "https://localhost:44378/api/User";
            const res = await fetch(url, {
                method: 'post',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: JSON.stringify(UsersList)
            })
            const response = await handleError(res);
            dispatch(UpsertUserSuccess());
        }
        catch (error) {
            dispatch(UpsertUserError(error));
        }
    }
}

export const RegisterUser = (UserDetails: any) => {
    return async (dispatch: any) => {
        try {
            console.log(JSON.stringify(UserDetails));
            const url = "https://localhost:44378/api/User/SignUp/"
            const response = await fetch(url, {
                method: 'post',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: JSON.stringify(UserDetails)
            });
            await handleError(response);
            dispatch(UserSignUpSuccess());
        }
        catch (error) {
            dispatch(UserSignUpError(error));
        }
    }
}

function handleError(response: any) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}