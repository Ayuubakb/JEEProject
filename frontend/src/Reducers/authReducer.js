// src/Reducers/authReducer.js
import { GET_CONECTED_USER_FAIL, GET_CONECTED_USER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../Actions/types";

const initialState = {
    access: localStorage.getItem("accessToken"),
    isAuthenticated: localStorage.getItem("access")!=null?true:false,
    role: localStorage.getItem("role"),
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem("accessToken", action.payload.token);
            localStorage.setItem("role", action.payload.role);
            localStorage.setItem("userId", action.payload.user.id_user); 
            return {
                ...state,
                access: action.payload.token,
                isAuthenticated: true,
                role: action.payload.role,
                user: action.payload.user,
            };
        case LOGIN_FAIL:
            return state;
        case LOGOUT_SUCCESS:
            localStorage.removeItem("accessToken");
            localStorage.removeItem("role");
            localStorage.removeItem("userId");
            return {
                ...state,
                ...initialState,
                isAuthenticated:false,
            };
        case GET_CONECTED_USER_SUCCESS:
            return{
                ...state,
                user:action.payload
            }
        case GET_CONECTED_USER_FAIL:
            return{
                ...state
            }
        default:
            return state;
    }
};

export default authReducer;