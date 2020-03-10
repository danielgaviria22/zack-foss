import { of } from "rxjs"
import { extractWith, extract } from "core/utils/functions"

export const nullaryActionCreator = type => () => ({ type })
export const unaryActionCreator = type => payload => ({ type, payload })
export const nAryActionCreator = (type, f) => (...args) => ({ type, payload: f(...args) })

export const fromActions = (...action) => (...data) => of(...action.map(extractWith(data)))
export const fromActionsEager = (...actions) => of(...actions.map(extract))