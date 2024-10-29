import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from "./types"
import { getAuthConfig } from "./config"

export const login=(email,password)=>async dispatch=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body=JSON.stringify({email:email,password:password})
    try{
        const response=await fetch(`${process.env.REACT_APP_SERVER_URI}auth/login`,{
            method:"POST",
            body:body,
            credentials:"include",
            ...config
        })
        if(!response.ok)
            return {err:"Try again",role:null}
        const data=await response.json()
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data
        })
        return {err:null,role:data.role}
    }catch{
        dispatch({
            type:LOGIN_FAIL,
            payload:null
        })
        return {err:"Something went wrong",role:null}
    }
}

export const logout=()=>async dispatch=>{
    dispatch({
        type:LOGOUT_SUCCESS,
        payload:null
    })
    return {loggedOut:true}
}