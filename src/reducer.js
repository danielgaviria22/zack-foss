import { combineReducers } from "redux";
import flagReducer from 'redux/flags'
import resourceReducer from 'redux/resources'

export const rootReducer = combineReducers({
    resources: resourceReducer,
    flags: flagReducer,
})