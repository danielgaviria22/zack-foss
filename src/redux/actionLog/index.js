import { createReducer, loadState, resetState, unaryActionCreator, nullaryActionCreator } from "../../core/utils/redux-utils"
import { append, prop, takeLast } from 'ramda'

export const LOAD_LOG = "zack-foss/LOAD_LOG";
export const ADD_LINE = "zack-foss/ADD_LINE";
export const RESET_LOG = "zack-foss/RESET_LOG";

const getPayload = prop("payload");
const appendFromAction = (state,action) => append(getPayload(action),state)
const onAddLine = (...args) => takeLast(20)(appendFromAction(...args))

export default createReducer({
    [ADD_LINE]: onAddLine,
    [LOAD_LOG]: loadState,
    [RESET_LOG]: resetState
})

export const loadLog = unaryActionCreator(LOAD_LOG)
export const addLine = unaryActionCreator(ADD_LINE)
export const resetLog = nullaryActionCreator(RESET_LOG)