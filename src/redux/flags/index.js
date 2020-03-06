import { propOr } from "ramda";
import { unaryActionCreator, nullaryActionCreator } from '../../utils/redux-utils'

export const TRIGGER_FLAG = "zack-foss/trigger-flag"
export const LOAD_FLAGS = "zack-foss/load-flags"
export const RESET_FLAGS = "zack-foss/reset-flags"

export default function reducer(prevState={},action) {
    const { type, payload } = action;
    switch(type){
        case TRIGGER_FLAG:
            return {
                ...prevState,
                [payload]: !propOr(false,payload,prevState)
            }
        case LOAD_FLAGS:
            return payload;
        case RESET_FLAGS:
            return {}
        default:
            return prevState;
    }
}

export const triggerFlag = unaryActionCreator(TRIGGER_FLAG)
export const loadFlags = unaryActionCreator(LOAD_FLAGS)
export const resetFlags = nullaryActionCreator(RESET_FLAGS)