import { toPairs, filter, propOr, join, pipe, map, head, compose } from "ramda"
import { extract } from 'core/utils/functions'

const validate = compose( extract , propOr(false,1))

/**
 * @description receives an object of boolean values or predicates and returns the concatenation of keys that resolve to true
 * @typedef {{() => boolean}} Predicate
 * @typedef {{ [key: string] : Predicate | boolean }} ClassConfig
 * @param {ClassConfig} classConfig
 * @example getClassName({ button: true, blue: () => false, red: () => 42 === 42 }) // returns "button red"
 */
export const getClassName = (classConfig) => pipe(
    toPairs,
    filter(validate), 
    map(head),
    join(" ")
)(classConfig)