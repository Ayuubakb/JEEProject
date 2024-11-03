// src/Reducers/authReducer.js
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../Actions/types";

const initialState = {
  access: localStorage.getItem("accessToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
  role: localStorage.getItem("role"),
  user: null,
  userId: localStorage.getItem("userId"),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("accessToken", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("userId", action.payload.user.id);
      return {
        ...state,
        access: action.payload.token,
        isAuthenticated: true,
        role: action.payload.role,
        user: action.payload.user,
        userId: action.payload.user.id,
      };
    case LOGIN_FAIL:
      return state;
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
        access: null,
        isAuthenticated: false,
        role: null,
        user: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default authReducer;