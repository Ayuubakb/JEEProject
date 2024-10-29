import{
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from "../Actions/types"

const initialState={
    acces:localStorage.getItem("access"),
    isAuthenticated:localStorage.getItem("access")==null?false:true,
    role:localStorage.getItem("role"),
    user:null
}

const authReducer=(state=initialState,action)=>{
    switch (action.type){
        case LOGIN_SUCCESS:
            localStorage.setItem("access",action.payload.token)
            localStorage.setItem("role",action.payload.role)
            return {
                ...state,
                acces:action.payload.token,
                isAuthenticated:true,
                role:action.payload.role,
                user:action.payload.user
            }
        case LOGIN_FAIL:
            return{
                ...state
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('access')
            localStorage.removeItem('role')
            return{
                ...state,
                ...initialState
            }
        default : 
            return state
    }
}
export default authReducer