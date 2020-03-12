import { propOr } from "ramda";
import { combineReducers } from "redux";
import { nAryActionCreator, createReducer, resetState, nullaryActionCreator, unaryActionCreator, loadState } from "core/utils/redux-utils";

export const TRIGGER_STATUS_EFFECT = 'zack-foss/trigger-effects'
export const RESET_STATUS_EFFECTS = 'zack-foss/reset-effects'
export const LOAD_STATUS_EFFECTS = 'zack-foss/load-effects'

export const CHANGE_STATUS_STATS = 'zack-foss/change-stats'
export const RESET_STATUS_STATS = 'zack-foss/reset-stats'
export const LOAD_STATUS_STATS = 'zack-foss/load-stats'

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
            [stat]: propOr(0,stat,state) + amount
        }
    },
    [LOAD_STATUS_STATS]: loadState,
    [RESET_STATUS_STATS]: resetState,
})

export default combineReducers({
    effects: statusEffectReducer,
    stats: statusStatsReducer
})

export const triggerEffect = unaryActionCreator(TRIGGER_STATUS_EFFECT);
export const loadEffects = unaryActionCreator(LOAD_STATUS_EFFECTS);
export const resetEffects = nullaryActionCreator(RESET_STATUS_EFFECTS);

export const changeStat = nAryActionCreator(CHANGE_STATUS_STATS,(stat,amount) => ({ stat, amount}))
export const loadStats = unaryActionCreator(LOAD_STATUS_STATS);
export const resetStats = nullaryActionCreator(RESET_STATUS_STATS);
