import { getAuthConfig } from "./config"
import {
    GET_CLIENTS_SUCCESS,
    GET_CLIENTS_FAIL,
} from "./types"

export const getClients=(clientFilter)=> async dispatch =>{
    const config=getAuthConfig();
    const response=await fetch(`${process.env.REACT_APP_SERVER_URI}/client/get`,{
        method:"POST",
        ...config,
        body:JSON.stringify(clientFilter)
    })
    if(!response.ok){
        dispatch({
            type:GET_CLIENTS_FAIL
        })
        return {err:"something went wrong"}
    }
    const data=await response.json()
    dispatch({
        type:GET_CLIENTS_SUCCESS,
        payload:data
    })
    return {err:null,data:data}
}
