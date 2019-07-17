import { ATTRIBUTES_FETCH_SUCCESS, ATTRIBUTES_FETCH_ERROR, ATTRIBUTES_FETCH_BEGIN } from "../Actions/AttributesActions";

const initialstate = {
    Attributes: [],
    AttributesError: false
}

export default function AttributesReducer(state = initialstate, action: any) {
    switch (action.type) {
        case ATTRIBUTES_FETCH_BEGIN:
            return {
                ...state,
                Attributes: []
            }
        case ATTRIBUTES_FETCH_SUCCESS:
            debugger;
            return {
                ...state,
                Attributes: action.payload.Attributes
            }
        case ATTRIBUTES_FETCH_ERROR:
            return {
                ...state,
                AttributesError: true
            }
        default:
            return {
                ...state
            }
    }
}