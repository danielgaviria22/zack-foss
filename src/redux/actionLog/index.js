import { append, prop } from 'ramda'
import { 
    createReducer, loadState,  
    unaryActionCreator, nullaryActionCreator, nAryActionCreator,
    shape,
    resetToInitialState
} from "../../core/utils/redux-utils"

export const LOAD_LOG = "zack-foss/load-log";
export const ADD_LINE = "zack-foss/add-line";
export const RESET_LOG = "zack-foss/reset-log";

const getPayload = prop("payload");
const appendFromAction = (state,action) => append(getPayload(action),state)
const onAddLine = (state,action) => appendFromAction(state,action)

export default createReducer({
    [ADD_LINE]: onAddLine,
    [LOAD_LOG]: loadState,
    [RESET_LOG]: resetToInitialState("actionLog")
})

export const loadLog = unaryActionCreator(LOAD_LOG)
const messageShape = shape("message","temporal")
export const addLine = nAryActionCreator(ADD_LINE,messageShape);
export const addFixedLine = nAryActionCreator(ADD_LINE, (message) => messageShape(message,false))
export const addTemporalLine = nAryActionCreator(ADD_LINE, (message) => messageShape(message,true))
export const resetLog = nullaryActionCreator(RESET_LOG)