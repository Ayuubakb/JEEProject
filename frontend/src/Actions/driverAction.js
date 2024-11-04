import { getAuthConfig } from "./config"
import {
    GET_DRIVER_SUCCESS,
    GET_DRIVER_FAIL,
} from "./types"

export const getDrivers=(driverFilter)=> async dispatch =>{
    const config=getAuthConfig();
    const response=await fetch(`${process.env.REACT_APP_SERVER_URI}/driver/get`,{
        method:"POST",
        ...config,
        body:JSON.stringify(driverFilter)
    })
    if(!response.ok){
        dispatch({
            type:GET_DRIVER_FAIL
        })
        return {err:"something went wrong"}
    }
    const data=await response.json()
    dispatch({
        type:GET_DRIVER_SUCCESS,
        payload:data
    })
    return {err:null,data:data}
}
