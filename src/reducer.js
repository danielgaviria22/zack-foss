import { combineReducers } from "redux"
import flagReducer from 'redux/flags'
import resourceReducer from 'redux/resources'
import statusReducer from 'redux/status'
import actionLogReducer from 'redux/actionLog'
import countersReducer from 'redux/counters'

export const rootReducer = combineReducers({
    resources: resourceReducer,
    flags: flagReducer,
    character: statusReducer,
    actionLog: actionLogReducer,
    counters: countersReducer,
})