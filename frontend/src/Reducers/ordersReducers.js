import {
    ORDER_FETCH_FAIL,
    ORDER_FETCH_SUCCESS
} from '../Actions/types';

const initialState={
    orders:[],
    loading:false,
    err:null
}

const ordersReducers=(state=initialState,action)=>{
    switch(action.type){
        case ORDER_FETCH_SUCCESS:
            return{
                ...state,
                orders:action.payload,
                loading:false,
                err:null
            }
        case ORDER_FETCH_FAIL:
            return{
                ...state,
                orders:[],
                loading:false,
                err:"Something Went Wrong"
            }
        default : 
            return state;
    }
}

export default ordersReducers;