import { of } from "rxjs"
import { extractWith, extract } from "core/utils/functions"
import { propOr, identity } from "ramda"

export const nullaryActionCreator = type => () => ({ type })
export const unaryActionCreator = type => payload => ({ type, payload })
export const nAryActionCreator = (type, f) => (...args) => ({ type, payload: f(...args) })

export const fromActions = (...action) => (...data) => of(...action.map(extractWith(data)))
export const fromActionsEager = (...actions) => of(...actions.map(extract))

/**
 * @typedef {{ type: string, payload: any }} Action
 * @param {{ [x: string]: (state?: any,action?:Action) => any}} obj
 * @returns {<T>(state: T,action: Action) => T}
 */
// @ts-ignore
export const createReducer = obj => (prevState={}, action) => propOr(identity,action.type,obj)(prevState,action)

export const resetState = (state,action) => ({})
export const loadState = (state,action) => action.payload