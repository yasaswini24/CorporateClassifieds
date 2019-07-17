export const SUBMISSION_SUCCESS = 'SUBMISSION_SUCCESS';
export const SUBMISSION_ERROR = 'SUBMISSION_ERROR';
export const FETCH_REPORTS_SUCCESS = 'FETCH_REPORTS_SUCCESS';
export const FETCH_REPORTS_BEGIN = 'FETCH_REPORTS_BEGIN';
export const FETCH_REPORTS_ERROR = 'FETCH_REPORTS_ERROR';

export const ReportSubmissionError = (error: any) => ({
    type: SUBMISSION_ERROR,
    payload: { error }
})

export const ReportSubmissionSuccess = () => ({
    type: SUBMISSION_SUCCESS
})

export const FetchReportsBegin = () => ({
    type: FETCH_REPORTS_BEGIN
})

export const FetchReportsSuccess = (ReportedAds: any) => ({
    type: FETCH_REPORTS_SUCCESS,
    payload: { ReportedAds }
})

export const FetchReportsError = (error: any) => ({
    type: FETCH_REPORTS_ERROR,
    payload: { error }
})

export function SubmitReport(report: any) {
    return async (dispatch: any) => {
        try {
            debugger;
            const url = "https://localhost:44378/api/Report";
            const response = await fetch(url, {
                method: 'post',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: JSON.stringify(report)
            });
            const res = await handleErrors(response);
            dispatch(ReportSubmissionSuccess());
        }
        catch (error) {
            return dispatch(ReportSubmissionError(error));
        }
    };
}

export function FetchReports() {
    return async (dispatch: any) => {
        try {
            debugger;
            dispatch(FetchReportsBegin());
            const url = "https://localhost:44378/api/Ads/GetReportedAds/";
            const response = await fetch(url);
            const res = await handleErrors(response);
            const json = await res.json();
            dispatch(FetchReportsSuccess(json));
        }
        catch (error) {
            dispatch(FetchReportsError(error));
        }
    }
}
function handleErrors(response: any) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}