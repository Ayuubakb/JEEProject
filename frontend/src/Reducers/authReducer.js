// src/Reducers/authReducer.js
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../Actions/types";

const initialState = {
    access: localStorage.getItem("access"),
    isAuthenticated: !!localStorage.getItem("access"),
    role: localStorage.getItem("role"),
    user: null,
    userId: localStorage.getItem("userId"), // Ajouter userId dans le state initial
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem("access", action.payload.token);
            localStorage.setItem("role", action.payload.role);
            localStorage.setItem("userId", action.payload.user.id); // Stocker l'ID utilisateur
            return {
                ...state,
                access: action.payload.token,
                isAuthenticated: true,
                role: action.payload.role,
                user: action.payload.user,
                userId: action.payload.user.id // Mettre à jour userId dans le state
            };
        case LOGIN_FAIL:
            return state;
        case LOGOUT_SUCCESS:
            localStorage.removeItem("access");
            localStorage.removeItem("role");
            localStorage.removeItem("userId");
            return {
                ...state,
                ...initialState
            };
        default:
            return state;
    }
};

export default authReducer;