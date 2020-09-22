import { combineReducers } from "redux"
import flagReducer from 'redux/flags'
import resourceReducer from 'redux/resources'
import statusReducer from 'redux/status'
import actionLogReducer from 'redux/actionLog'
import countersReducer from 'redux/counters'
import loadReducer from 'redux/load'
import locationReducer from 'redux/location'
import sessionReducer from 'redux/main'
import cooldownsReducer from 'redux/cooldowns'

export const rootReducer = combineReducers({
    ready: loadReducer,
    main: sessionReducer,
    resources: resourceReducer,
    flags: flagReducer,
    character: statusReducer,
    actionLog: actionLogReducer,
    counters: countersReducer,
    location: locationReducer,
    cooldowns: cooldownsReducer
})