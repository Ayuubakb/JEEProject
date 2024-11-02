// src/Actions/authActions.js
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './types';

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

    localStorage.setItem('userId', data.user.id_user);
    localStorage.setItem('accessToken', data.token);
    return { err: null, role: data.role, userId: data.user.id_user };
  } catch {
    dispatch({
      type: LOGIN_FAIL,
      payload: null,
    });
    return { err: 'Something went wrong', role: null };
  }
};
