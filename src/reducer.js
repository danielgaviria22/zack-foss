import { combineReducers } from "redux"
import flagReducer from 'redux/flags'
import resourceReducer from 'redux/resources'
import statusReducer from 'redux/status'
import actionLogReducer from 'redux/actionLog'
import countersReducer from 'redux/counters'
import loadReducer from 'redux/load'

export const rootReducer = combineReducers({
    ready: loadReducer,
    resources: resourceReducer,
    flags: flagReducer,
    character: statusReducer,
    actionLog: actionLogReducer,
    counters: countersReducer,
})