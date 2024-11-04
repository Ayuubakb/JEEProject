import { getAuthConfig } from './config'
import {
    GET_AGENCY_FAIL,
    GET_AGENCY_SUCCESS
} from './types'


export const getAgencies=()=>async dispatch=>{
    const config=getAuthConfig()
    const response=await fetch(`${process.env.REACT_APP_SERVER_URI}/agency/get`,{
        method:"GET",
        ...config
    })
    if(!response.ok){
        dispatch({
            type:GET_AGENCY_FAIL
        })
        return {err:"Something Went Wrong"}
    }
    const data=await response.json()
    dispatch({
        type:GET_AGENCY_SUCCESS,
        payload:data
    })
    return {data:data,err:null}
}
