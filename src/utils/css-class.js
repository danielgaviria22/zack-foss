import { toPairs, filter, propOr, join, pipe, map, head, compose } from "ramda"
import { extract } from './redux-utils'

const validate = compose( extract , propOr(false,1))

export const getClassName = pipe(
    toPairs,
    filter(validate), 
    map(head),
    join(" ")
)