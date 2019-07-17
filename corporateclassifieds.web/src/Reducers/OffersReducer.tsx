const intialstate = {
    Offers: [],
    error: false,
    loading: true,
    OfferPostError:false,
    OffersAvailable:false,
    errorInfo:""
};

export default function AdReducer(state = intialstate, action: any) {
    switch (action.type) {
        case 'FETCH_OFFERS_BEGIN': console.log("Offers fetch begin");
            return {
                ...state,
                loading: true,
                error: false,

            }

        case 'FETCH_OFFERS_SUCCESS': console.log("Offers fetchsuccess")
        debugger;
        if(action.payload.Offers.length==0)
            return {
                ...state,
                loading: false,
                Offers: [],
                OffersAvailable:false,
                error:false
            }
        else
            return {
                ...state,
                loading: false,
                Offers: action.payload.Offers,
                OffersAvailable:true,
                error:false
            }

        case 'FETCH_OFFERS_ERROR': console.log("Offers fetch error")
            return {
                ...state,
                loading: false,
                errorInfo: action.payload.error,
                error:true,
                Offers: [],
                OffersAvailable:false
            }

        case 'POST_OFFER_ERROR':
            return{
                ...state,
                OfferPostError:true
            }
        default:
            return state;
    }
}