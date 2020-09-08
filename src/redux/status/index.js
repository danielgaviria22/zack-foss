// @ts-nocheck
import { combineReducers } from "redux";
import { propEq, equals, ifElse, always, filter, compose, propSatisfies, findIndex, adjust, evolve, add, append, none, isNil } from "ramda";
import { nAryActionCreator, createReducer, nullaryActionCreator, unaryActionCreator, loadState, resetToInitialState } from "core/utils/redux-utils";
import { triggerBooleanProp, addToNumericProp } from "core/utils/functions";

export const TRIGGER_STATUS_EFFECT = 'zack-foss/trigger-effects'
export const RESET_STATUS_EFFECTS = 'zack-foss/reset-effects'
export const LOAD_STATUS_EFFECTS = 'zack-foss/load-effects'
export const CHANGE_STATUS_EFFECT = 'zack-foss/change-status-effect'

export const CHANGE_STATUS_STATS = 'zack-foss/change-stats'
export const RESET_STATUS_STATS = 'zack-foss/reset-stats'
export const LOAD_STATUS_STATS = 'zack-foss/load-stats'

export const CHANGE_INVENTORY = 'zack-foss/change-inventory'
export const LOAD_STATUS_INVENTORY = 'zack-foss/load-inventory'
export const EMPTY_INVENTORY = 'zack-foss/empty-inventory'

const limitAmount = (stat,amount,state) => {
    const max = state[`MAX_${stat}`];
    const min = state[`MIN_${stat}`] || 0;
    const curVal = state[stat] || 0;
    const newVal = (state[stat] + amount)
    if( !isNil(max) && newVal > max ){
        return max - curVal;
    }
    if( !isNil(min) && newVal < min ){
        return min - curVal;
    }
    return amount;
}

const statusEffectReducer = createReducer({
    [TRIGGER_STATUS_EFFECT]: (state,action) => {
        const { payload } = action
        return triggerBooleanProp(payload,state)
    },
    [CHANGE_STATUS_EFFECT]: (state,action) => {
        const { payload: { effect, amount } } = action
        return addToNumericProp(effect,amount,state)
    },
    [LOAD_STATUS_EFFECTS]: loadState,
    [RESET_STATUS_EFFECTS]: resetToInitialState("character.effects"),
})

const statusStatsReducer = createReducer({
    [CHANGE_STATUS_STATS]: (state,action) => {
        const { payload: { stat, amount:rawAmount } } = action
        const amount = limitAmount(stat,rawAmount,state)
        return addToNumericProp(stat,amount,state)
    },
    [LOAD_STATUS_STATS]: loadState,
    [RESET_STATUS_STATS]: resetToInitialState("character.stats"),
})

const statusInventoryReducer = createReducer({
    [CHANGE_INVENTORY]: (state=[],action) => {
        const { payload: { id, amount } } = action
        return ifElse(
            equals(0),
            always(state),
            (amount) => {
                return compose(
                    filter(propSatisfies(x => x > 0,"amount")),
                    ifElse(
                        none(propEq("id",id)),
                        append({ id, amount }),
                        adjust(
                            findIndex(propEq("id",id),state),
                            evolve({ amount: add(amount) })
                        ),
                    )
                )(state)
            }
        )(amount)
    },
    [LOAD_STATUS_INVENTORY]: loadState,
    [EMPTY_INVENTORY]: () => []
})

export default combineReducers({
    effects: statusEffectReducer,
    stats: statusStatsReducer,
    inventory: statusInventoryReducer,
})

export const triggerEffect = unaryActionCreator(TRIGGER_STATUS_EFFECT);
export const loadEffects = unaryActionCreator(LOAD_STATUS_EFFECTS);
export const resetEffects = nullaryActionCreator(RESET_STATUS_EFFECTS);
export const changeEffect = nAryActionCreator(CHANGE_STATUS_EFFECT,(effect,amount) => ({ effect , amount }))

export const changeStat = nAryActionCreator(CHANGE_STATUS_STATS,(stat,amount) => ({ stat, amount}))
export const loadStats = unaryActionCreator(LOAD_STATUS_STATS);
export const resetStats = nullaryActionCreator(RESET_STATUS_STATS);

export const changeInventory = nAryActionCreator(CHANGE_INVENTORY,(id,amount) => ({ id, amount }))
export const loadInventory = unaryActionCreator(LOAD_STATUS_INVENTORY);
export const emptyInventory = nullaryActionCreator(EMPTY_INVENTORY);