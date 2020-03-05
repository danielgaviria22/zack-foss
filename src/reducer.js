import { combineReducers } from "redux";
import resourceReducer from './redux/resources'

export const rootReducer = combineReducers({
    resources: resourceReducer,
})