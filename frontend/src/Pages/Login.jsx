import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../Actions/authAction'

const Login = () => {
  const dispatch=useDispatch()
  const [inputs,setInputs]=useState({email:"",password:""})
  const [err,setErr]=useState("")
  const handleLogin=async (e)=>{
    e.preventDefault()
    setErr("")
    if(inputs.email!=="" && inputs.password!==""){
        let res=await dispatch(login(inputs.email,inputs.password))
        if(res.err!=null)
            setErr(err)
        else
            setErr("Logged")
    }else{
        setErr("Please fill all fields")
    }
  }
  return (
    <section>
        {
            err!==""?
            <div>
                <p>{err}</p>
            </div>:null
        }
        <form onSubmit={(e)=>handleLogin(e)}>
            <div>
                <label></label>
                <input
                    type='email'
                    name='email'
                    value={inputs.email}
                    onChange={(e)=>{setInputs((prev)=>{return {...prev,[e.target.name]:e.target.value}})}}
                />
            </div>
            <div>
                <label></label>
                <input
                    type='password'
                    name='password'
                    value={inputs.password}
                    onChange={(e)=>setInputs((prev)=>{return {...prev,[e.target.name]:e.target.value}})}
                />
            </div>
            <div>
                <button type='submit'>
                    Login
                </button>
            </div>
        </form>
    </section>

  )
}

export default Login