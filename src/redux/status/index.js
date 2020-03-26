import { propOr, propEq, equals, ifElse, always, filter, compose, propSatisfies } from "ramda";
import { combineReducers } from "redux";
import { nAryActionCreator, createReducer, resetState, nullaryActionCreator, unaryActionCreator, loadState } from "core/utils/redux-utils";
import { propNeq, findOr } from "core/utils/functions";

export const TRIGGER_STATUS_EFFECT = 'zack-foss/trigger-effects'
export const RESET_STATUS_EFFECTS = 'zack-foss/reset-effects'
export const LOAD_STATUS_EFFECTS = 'zack-foss/load-effects'

export const CHANGE_STATUS_STATS = 'zack-foss/change-stats'
export const RESET_STATUS_STATS = 'zack-foss/reset-stats'
export const LOAD_STATUS_STATS = 'zack-foss/load-stats'

export const CHANGE_INVENTORY = 'zack-foss/change-inventory'
export const LOAD_STATUS_INVENTORY = 'zack-foss/load-inventory'
export const EMPTY_INVENTORY = 'zack-foss/empty-inventory'

const statusEffectReducer = createReducer({
    [TRIGGER_STATUS_EFFECT]: (state,action) => {
        const { payload } = action
        return {
            ...state,
            [payload]: !propOr(false,payload,state)
        }
    },
    [LOAD_STATUS_EFFECTS]: loadState,
    [RESET_STATUS_EFFECTS]: resetState,
})

const statusStatsReducer = createReducer({
    [CHANGE_STATUS_STATS]: (state,action) => {
        const { payload: { stat, amount } } = action
        return {
            ...state,
            [stat]: propOr(0,stat,state) + amount
        }
    },
    [LOAD_STATUS_STATS]: loadState,
    [RESET_STATUS_STATS]: resetState,
})

const statusInventoryReducer = createReducer({
    [CHANGE_INVENTORY]: (state=[],action) => {
        if( equals({},state) ) {
            state = []
        }
        const { payload: { id, amount } } = action
        return ifElse(
            equals(0),
            always(state),
            (amount) => {
                return compose(
                    filter(propSatisfies(x => x > 0,"amount")),
                    (item) => [
                        ...filter(propNeq("id",item.id),state),
                        { id, amount: item.amount + amount }
                    ],
                    findOr(
                        { id, amount: 0 },
                        propEq("id",id)
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

export const changeStat = nAryActionCreator(CHANGE_STATUS_STATS,(stat,amount) => ({ stat, amount}))
export const loadStats = unaryActionCreator(LOAD_STATUS_STATS);
export const resetStats = nullaryActionCreator(RESET_STATUS_STATS);

export const changeInventory = nAryActionCreator(CHANGE_INVENTORY,(id,amount) => ({ id, amount }))
export const loadInventory = unaryActionCreator(LOAD_STATUS_INVENTORY);
export const emptyInventory = nullaryActionCreator(EMPTY_INVENTORY);