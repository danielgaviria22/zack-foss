import { __, is, ifElse, apply, identity, pathOr, curryN } from 'ramda'

/**
 * @description if the value given is a function, applies it with "data" as arguments and returns the result. Otherwise, it is equal to R.identity
 * @param {any} data arguments for apply
 * @param {any} value value to be extracted
 */
export const extractWith = (data) => (value) => ifElse(
    is(Function), 
    apply(__,data), 
    identity
)(value)

/**
 * @description if the value given is a function, applies it with empty arguments and returns the result. Otherwise, is equal to R.identity
 * @param {any} value value to be extracted
 */
export const extract = (value) => extractWith([])(value)

/**
 * @description calls ramda path function using dot(.) separated paths. The function is curried using ramda
 * @param {any} or default value when path is undefined
 * @param {string} path dot separated path
 * @param {object} obj obj to get path from
 * @example 
 * dotPathOr(0,"a.b.c",{ a: { b: { c: 5 } } }) // returns 5
 * dotPathOr(0,"a.b.c",{ a: { b: { } } }) // returns 0
 */
export const dotPathOr = curryN(3,(or,path,obj) => pathOr(or,path.split("."),obj));