import { propOr } from "ramda";
import { unaryActionCreator, nullaryActionCreator, createReducer, loadState, resetState } from "core/utils/redux-utils";

export const TRIGGER_FLAG = "zack-foss/trigger-flag"
export const LOAD_FLAGS = "zack-foss/load-flags"
export const RESET_FLAGS = "zack-foss/reset-flags"

export default createReducer({
    [TRIGGER_FLAG]: (state,action) => {
        const { payload } = action;
        return {
            ...state,
            [payload]: !propOr(false,payload,state)
        }
    },
    [LOAD_FLAGS]: loadState,
    [RESET_FLAGS]: resetState
})

export const triggerFlag = unaryActionCreator(TRIGGER_FLAG)
export const loadFlags = unaryActionCreator(LOAD_FLAGS)
export const resetFlags = nullaryActionCreator(RESET_FLAGS)