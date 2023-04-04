import { 
    createReducer, loadState, nAryActionCreator, 
    nullaryActionCreator, resetToInitialState, shape, 
    unaryActionCreator 
} from "core/utils/redux-utils"
import { 
    adjust, append, assoc, 
    compose, dec, evolve, 
    findIndex, max, mergeRight, 
    propEq 
} from "ramda"

export const SET_COOLDOWN = "zack-foss/set-cooldown"
export const REDUCE_COOLDOWN = "zack-foss/reduce-cooldown"
export const LOAD_COOLDOWNS = "zack-foss/load-cooldown"
export const RESET_COOLDOWNS = "zack-foss/reset-cooldown"

const removeMarked = x => !x.delete
const markForRemoval = s => s.amount <= 0 ? assoc("delete",true,s) : s
const decCooldown = evolve({ amount: compose(max(0),dec) })

export default createReducer({
    [SET_COOLDOWN]: (state,action) => append(
        mergeRight( action.payload, { 
            loading: true, 
            max: action.payload.amount 
        }), 
        state
    )
    ,
    [REDUCE_COOLDOWN]: (state,action) => {
        const id = action.payload
        const idx = findIndex(propEq("id",id),state);
        return adjust(idx, decCooldown, state)
                .filter(removeMarked)
                .map(markForRemoval)
    },
    [LOAD_COOLDOWNS]: loadState,
    [RESET_COOLDOWNS]: resetToInitialState("cooldowns")
})

export const setCooldown = nAryActionCreator(SET_COOLDOWN,shape("id","amount"));
export const reduceCooldown = unaryActionCreator(REDUCE_COOLDOWN)
export const loadCooldowns = unaryActionCreator(LOAD_COOLDOWNS)
export const resetCooldowns = nullaryActionCreator(RESET_COOLDOWNS)