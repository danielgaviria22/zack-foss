import { of } from "rxjs"

export const nullaryActionCreator = type => () => ({ type })
export const unaryActionCreator = type => payload => ({ type, payload })
export const nAryActionCreator = (type, f) => (...args) => ({ type, payload: f(...args) })

const extractWith = (data) => (f) => typeof(f) === "function" ? f(...data) : f
const extract = extractWith([])

export const fromActions = (...action) => (...data) => of(...action.map(extractWith(data)))
export const fromActionsEager = (...actions) => of(...actions.map(extract))