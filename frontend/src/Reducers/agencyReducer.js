import axios from 'axios'
import {
    GET_AGENCY_FAIL,
    GET_AGENCY_SUCCESS
} from '../Actions/types'

const initialState={
    agencies:[],
    loading:false,
    err:null
}

const agencyReducer=(state=initialState,action)=>{
    switch (action.type){
        case GET_AGENCY_SUCCESS:
            return{
                ...state,
                agencies:action.payload,
                loading:false,
                err:null
            }
        case GET_AGENCY_FAIL:
            return{
                ...state,
                err:"Something Went Wrong"
            }
        default : 
            return state
    }
}

export default agencyReducer