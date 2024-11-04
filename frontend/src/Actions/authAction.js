// src/Actions/authActions.js
import { getAuthConfig } from './config';
import { GET_CLIENTS_FAIL, GET_CONECTED_USER_FAIL, GET_CONECTED_USER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './types';

// src/Actions/authActions.js
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email: email, password: password });
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/auth/login`, {
      method: 'POST',
      body: body,
      credentials: 'include',
      ...config,
    });
    if (!response.ok) return { err: 'Try again', role: null };
    const data = await response.json();
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    return { err: null, role: data.role, userId: data.user.id_user };
  } catch {
    dispatch({
      type: LOGIN_FAIL,
      payload: null,
    });
    return { err: 'Something went wrong', role: null };
  }
};

export const getConnectedUser=()=>async dispatch=>{
    const config=getAuthConfig();
    const id=localStorage.getItem('userId')
    const role=localStorage.getItem('role').toLowerCase()
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/${role}/get/id/${id}`, {
          method: 'GET',
          credentials: 'include',
          ...config,
        });
        if (!response.ok) return { err: 'Try again'};
        const data = await response.json();
        dispatch({
          type: GET_CONECTED_USER_SUCCESS,
          payload: data,
        });
        return { err: null, user: data};
      } catch {
        dispatch({
          type: GET_CONECTED_USER_FAIL,
          payload: null,
        });
        return { err: 'Something went wrong'};
      }
}

export const logout=()=> async dispatch=>{
    dispatch({
        type:LOGOUT_SUCCESS,
    })
    return {loggedOut : true}
}