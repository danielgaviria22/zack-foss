import { combineReducers } from "redux"
import flagReducer from 'redux/flags'
import resourceReducer from 'redux/resources'
import statusReducer from 'redux/status'
import actionLogReducer from 'redux/actionLog'

export const rootReducer = combineReducers({
    resources: resourceReducer,
    flags: flagReducer,
    character: statusReducer,
    actionLog: actionLogReducer,
})