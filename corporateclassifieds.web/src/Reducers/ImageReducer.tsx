import { FETCH_IMAGE_BEGIN, FETCH_IMAGE_SUCCESS, FETCH_IMAGE_ERROR } from "../Actions/ImageActions";
interface IImage {
    [key: string]: string
}
const intialstate: any =
{
    Images: {},
    loaded: false
}

export default function ImageReducer(state = intialstate, action: any) {
    switch (action.type) {
        case FETCH_IMAGE_BEGIN:
            console.log("image fetch begin");
            return {
                ...state,
            }

        case FETCH_IMAGE_SUCCESS:
            console.log("image fetch success");
            var _image = {
                [action.payload.Images[0].adID]: action.payload.Images[0].image
            };
            return {
                ...state,
                loaded: true,
                Images: { ...state.Images, ..._image }
            }

        case FETCH_IMAGE_ERROR:
            console.log("image fetch error");
            return {
                ...state,
                imageError: action.payload.error,
                Images: {}
            }
        default:
            return state;
    }
}