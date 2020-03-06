import { of } from "rxjs"
import { __, is, ifElse, apply, identity } from 'ramda'

export const nullaryActionCreator = type => () => ({ type })
export const unaryActionCreator = type => payload => ({ type, payload })
export const nAryActionCreator = (type, f) => (...args) => ({ type, payload: f(...args) })

const extractWith = (data) => ifElse(
    is(Function), 
    apply(__,data), 
    identity
)
export const extract = extractWith([])

export const fromActions = (...action) => (...data) => of(...action.map(extractWith(data)))
export const fromActionsEager = (...actions) => of(...actions.map(extract))