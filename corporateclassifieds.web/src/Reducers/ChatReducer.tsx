import { FETCH_OFFER_CHAT_BEGIN, FETCH_OFFER_CHAT_SUCCESS, FETCH_OFFER_CHAT_ERROR, POST_MESSAGE_SUCCESS, POST_MESSAGE_ERROR } from "../Actions/ChatActions";

const intialstate = {
    Messages: [],
    FetchOfferChatError: false,
    loading: true,
    MessagePostError: false,
    MessagesAvailable: false,
    MessagePostErrorInfo: "",
    FetchOfferChatErrorInfo: ""
};

export default function ChatReducer(state = intialstate, action: any) {
    switch (action.type) {
        case FETCH_OFFER_CHAT_BEGIN:
            return {
                ...state,
                loading: true,
                FetchOfferChatError: false,
            }

        case FETCH_OFFER_CHAT_SUCCESS:
            // debugger;
            if (action.payload.Chat.length == 0)
                return {
                    ...state,
                    loading: false,
                    Messages: [],
                    MessagesAvailable: false,
                    FetchOfferChatError: false
                }
            else
                return {
                    ...state,
                    loading: false,
                    Messages: action.payload.Chat,
                    MessagesAvailable: true,
                    FetchOfferChatError: false
                }

        case FETCH_OFFER_CHAT_ERROR:
            return {
                ...state,
                loading: false,
                FetchOfferChatErrorInfo: action.payload.error,
                FetchOfferChatError: true,
                Messages: [],
                MessagesAvailable: false
            }

        case POST_MESSAGE_SUCCESS:
            return {
                ...state,
                MessagePostSuccess: true,
                MessagePostError: false
            }

        case POST_MESSAGE_ERROR:
            return {
                ...state,
                MessagePostError: true,
                MessagePostErrorInfo: action.payload.error
            }
        default:
            return state;
    }
}