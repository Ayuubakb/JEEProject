import{
    GET_DRIVER_FAIL,
    GET_DRIVER_SUCCESS
} from "../Actions/types"

const initialState={
    drivers:[],
    loading:false,
    err:null
}

const driverReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_DRIVER_SUCCESS :
            return {
                ...state,
                drivers:action.payload,
                loading:false,
                err:null
            }
        case GET_DRIVER_FAIL:
            return {
                ...state,
                drivers:[],
                loading:false,
                err:"Something Went Wrong"
            }
        default :
            return state
    }
}
export default driverReducer;