import { getAuthConfig } from './config'
import{
    ORDER_FETCH_FAIL,
    ORDER_FETCH_SUCCESS
} from './types'

export const getOrders=(orderFilter)=>async dispatch=>{
    const config=getAuthConfig();
    const response=await fetch(`${process.env.REACT_APP_SERVER_URI}/order/get`,{
        method:'POST',
        ...config,
        body:JSON.stringify(orderFilter)
    })
    if(!response.ok){
        dispatch({
            type:ORDER_FETCH_FAIL,
        })
        return {err:"Something Went Wrong"}
    }
    const data=await response.json();
    dispatch({
        type:ORDER_FETCH_SUCCESS,
        payload:data
    })
    return {err:null,data:data}
}