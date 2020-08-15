import { 
    createReducer, loadState, resetState, 
    unaryActionCreator, nullaryActionCreator, nAryActionCreator,
    shape
} from "../../core/utils/redux-utils"
import { append, prop } from 'ramda'

export const LOAD_LOG = "zack-foss/LOAD_LOG";
export const ADD_LINE = "zack-foss/ADD_LINE";
export const RESET_LOG = "zack-foss/RESET_LOG";

const getPayload = prop("payload");
const appendFromAction = (state,action) => append(getPayload(action),state)
const onAddLine = (state,action) => appendFromAction(state,action)

export default createReducer({
    [ADD_LINE]: onAddLine,
    [LOAD_LOG]: loadState,
    [RESET_LOG]: resetState
})

export const loadLog = unaryActionCreator(LOAD_LOG)
export const addLine = nAryActionCreator(ADD_LINE,shape("message","temporal"));
export const addFixedLine = nAryActionCreator(ADD_LINE, (message) => addLine(message,false))
export const addTemporalLine = nAryActionCreator(ADD_LINE, (message) => addLine(message,true))
export const resetLog = nullaryActionCreator(RESET_LOG)