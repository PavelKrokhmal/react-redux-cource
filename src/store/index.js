import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";

import {cashReducer} from './cashReducer'
import {customerReducer} from './customerReducer'
import {countReducer} from './countReducer'
import {userReducer} from './userReducer'
import { rootWatcher } from "../saga";

const sagaMiddleware = createSagaMiddleware()

const root = combineReducers({
    cash: cashReducer,
    customer: customerReducer,
    countReducer,
    userReducer
})

export const store = createStore(root, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)))

sagaMiddleware.run(rootWatcher)