import{
    GET_CLIENTS_FAIL,
    GET_CLIENTS_SUCCESS
} from "../Actions/types"

const initialState={
    clients:[],
    loading:false,
    err:null
}

const clientReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_CLIENTS_SUCCESS :
            return {
                ...state,
                clients:action.payload,
                loading:false,
                err:null
            }
        case GET_CLIENTS_FAIL:
            return {
                ...state,
                clients:[],
                loading:false,
                err:"Something Went Wrong"
            }
        default :
            return state
    }
}
export default clientReducer;