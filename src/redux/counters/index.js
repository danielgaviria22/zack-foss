import { createReducer, nAryActionCreator, loadState, resetState, unaryActionCreator, nullaryActionCreator } from "core/utils/redux-utils"
import { assoc, lt } from "ramda";

export const SET_COUNTER = "zack-foss/set-counter"
export const INC_COUNTER = "zack-foss/inc-counter"
export const DEC_COUNTER = "zack-foss/dec-counter"
export const LOAD_COUNTERS = "zack-foss/load-counters"
export const RESET_COUNTERS = "zack-foss/reset-counters"

const counterMutation = (callback) => (state,action) => {
    const { payload: { name, amount } } = action;
    if( lt(amount,0) ){
        console.warn("Invariant violation: Counter action only accepts positive numbers. State mutation avoided")
        return state;
    }
    return callback(name,amount,state)
}

export default createReducer({
    [SET_COUNTER]: counterMutation(assoc),
    [INC_COUNTER] : counterMutation((name,amount,state) => {
        return assoc(name,(state[name] || 0) + amount, state);
    }),
    [DEC_COUNTER] : counterMutation((name, amount, state) => {
        if( state[name] ){
            if( state[name] > amount){
                return assoc(name,state[name] - amount,state)
            } else {
                return assoc(name,0,state)
            }
        } else {
            return state
        }
    }),
    [LOAD_COUNTERS]: loadState,
    [RESET_COUNTERS]: resetState,
})

export const setCounter = nAryActionCreator(SET_COUNTER,(name,amount) => ({name,amount}))
export const incCounter = nAryActionCreator(INC_COUNTER,(name,amount=1) => ({name,amount}))
export const decCounter = nAryActionCreator(DEC_COUNTER,(name,amount=1) => ({name,amount}))
export const loadCounters = unaryActionCreator(LOAD_COUNTERS);
export const resetCounters = nullaryActionCreator(RESET_COUNTERS);