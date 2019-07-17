import { SUBMISSION_SUCCESS, SUBMISSION_ERROR, FETCH_REPORTS_ERROR, FETCH_REPORTS_BEGIN, FETCH_REPORTS_SUCCESS } from "../Actions/ReportActions";

const intialstate = {
    showSucess: false,
    showFail: false,
    ReportError: false,
    ReportErrorInfo: "",
    ReportFetchSuccess: false,
    ReportLoading: false,
    ReportedAds: [],
    loading:false
}

export default function ReportReducer(state = intialstate, action: any) {
    switch (action.type) {

        case SUBMISSION_SUCCESS: console.log("Reports Fetch success")
            return {
                ...state,
                showSucess: true
            }

        case SUBMISSION_ERROR: console.log("Reports fetch error")
            return {
                ...state,
                showFail: true,
                error: action.payload.error
            }

        case FETCH_REPORTS_BEGIN:
            debugger;
            return {
                ...state,
                ReportError: false,
                ReportLoading: true,
                ReportedAds: [],
                loading: true,
            }

        case FETCH_REPORTS_SUCCESS:
            debugger;
            return {
                ...state,
                ReportFetchSuccess: true,
                ReportLoading: false,
                ReportError: false,
                loading: false,
                ReportedAds: action.payload.ReportedAds
            }
        case FETCH_REPORTS_ERROR:
            return {
                ...state,
                ReportError: true,
                ReportLoading: false,
                loading: false,
                ReportErrorInfo: action.payload.error
            }

        default:
            return state;
    }
}