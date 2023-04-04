import { createReducer, nAryActionCreator, loadState, resetState, unaryActionCreator, nullaryActionCreator } from "core/utils/redux-utils"
import { assoc, gte, __ } from "ramda";
import { Result } from "jazzi";

export const SET_COUNTER = "zack-foss/set-counter"
export const INC_COUNTER = "zack-foss/inc-counter"
export const DEC_COUNTER = "zack-foss/dec-counter"
export const LOAD_COUNTERS = "zack-foss/load-counters"
export const RESET_COUNTERS = "zack-foss/reset-counters"

const parseAction = (callback) => (state,action) => {
    const { payload: { name, amount } } = action;
    return Result.fromPredicate(gte(__,0), amount)
        .map(() => callback(name,amount,state))
        .onErr((amount) => {
            const typeName = action.type.split("/")[1]
            console.warn(`Invariant violation: "${typeName}" actions only accept positive numbers but received "${amount}" instead. Mutation of "${name}" counter avoided`)
            return state
        })
}

export default createReducer({
    [SET_COUNTER]: parseAction(assoc),
    [INC_COUNTER] : parseAction((name,amount,state) => {
        return assoc(name,(state[name] || 0) + amount, state);
    }),
    [DEC_COUNTER] : parseAction((name, amount, state) => {
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