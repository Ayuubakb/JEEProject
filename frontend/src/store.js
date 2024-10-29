import { createStore,applyMiddleware } from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import {thunk} from "redux-thunk";
import rootReducer from "../src/Reducers"


const initialState={}

const middleWare=[thunk]

const composedEnhancer=composeWithDevTools(
    applyMiddleware(
        ...middleWare
    )
)

const store=createStore(
    rootReducer,
    initialState,
    composedEnhancer
)

export default store