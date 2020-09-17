import { 
    __, is, ifElse, apply, identity, pathOr, curryN, complement, 
    propEq, find, evolve, when, propSatisfies, assoc, not, add, useWith, 
    isNil, path 
} from 'ramda'
import { compose } from 'redux';

/**
 * @description if the value given is a function, applies it with "data" as arguments and returns the result. 
 * Otherwise, it is equal to R.identity
 * @param {any} data arguments for apply
 */
export const extractWith = (data) => (value) => ifElse(
    is(Function), 
    (fn) => apply(fn,data), 
    identity
)(value)

/**
 * @description if the value given is a function, applies it with empty arguments and returns the result. 
 * Otherwise, is equal to R.identity
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



/**
 * @description calls ramda path function using dot(.) separated paths. The function is curried using ramda
 * @param {string} path dot separated path
 * @param {object} obj obj to get path from
 * @example 
 * dotPath("a.b.c",{ a: { b: { c: 5 } } }) // returns 5
 * dotPath("a.b.c",{ a: { b: { } } }) // returns undefined
 */
export const dotPath = curryN(2,(pathStr,obj) => path(pathStr.split("."),obj))

export const dotPathOrFrom = curryN(3, (other,str,obj) => dotPath(str,obj) || dotPath(str,other))

/**
 * @description maps an object's keys returning a new object with the mapped keys
 * @param {(key: string) => string | number | symbol } fn iteratee
 * @param {any} data object
 */
export const mapKeys = (fn,data) => Object.keys(data).reduce((acc,key) => ({...acc, [fn(key)]: data[key] }),{})

/**
 * @description Complement of propEq. Equivalent to compose( complement(equals), prop )
 * @param {string | number | symbol} name key of the attribute
 * @param {any} value fallback value in case prop is undefined
 * @param {any} obj object where the attribute will be looked up
 */
export const propNeq = curryN(3, (att,value,obj) => complement(propEq)(att,value,obj))

/**
 * @description Finds the first element that meet the given predicate. Otherwise returns the fallback value
 * @param {any} or fallback value
 * @param {() => boolean} pred predicate used to find element
 * @param {Array} data array to be looked up
 */
export const findOr = curryN(3, (or,pred,data) => find(pred,data) || or )

export const defineAndTransformProp = curryN(4,(zero,name,transform,obj) => {
    return compose(
        evolve({ [name]: transform }),
        when(
            propSatisfies(isNil, name),
            assoc(name,zero)
        )
    )(obj)
})

export const addToNumericProp = useWith(
    defineAndTransformProp, 
    [identity, identity, add, identity]
)(0)

export const transformBooleanProp = defineAndTransformProp(false);
export const triggerBooleanProp = defineAndTransformProp(false,__,not);

/**
 * Returns a random integer between min and max exclusive
 * @param {number} min 
 * @param {number} max 
 */
export const randomInteger = (min,max) => Math.floor(Math.random() * (max - min) ) + min;
