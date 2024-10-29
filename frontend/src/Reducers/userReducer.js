import{
    GET_USER_FAIL,
    GET_USER_SUCCESS
} from "../Actions/types"

const initialState={
    user:{},
    loading:false,
    err:null
}

const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_USER_SUCCESS :
            return {
                ...state,
                user:action.payload,
                loading:false,
                err:null
            }
        case GET_USER_FAIL:
            return {
                ...state,
                user:action.payload,
                loading:false,
                err:"Something Went Wrong"
            }
        default :
            return state
    }
}
export default userReducer;