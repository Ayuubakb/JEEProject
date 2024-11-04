import {combineReducers} from "redux"
import authReducer from "./authReducer"
import ordersReducers from "./ordersReducers"
import clientReducer from "./clientReducer"
import agencyReducer from "./agencyReducer"
import driverReducer from "./driverReducer"

export default combineReducers({
    authReducer,
    ordersReducers,
    clientReducer,
    agencyReducer,
    driverReducer
})

