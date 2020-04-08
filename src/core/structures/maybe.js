import { equals } from "ramda"

/**
 * @typedef None
 * @property {() => undefined} get
 * @property {<B>(f: (a: A) => B) => None} map
 * @property {(f: (a: A) => any) => any} flatMap
 * @property {() => boolean} isJust
 * @property {() => boolean} isNone
 * @property {<B>(f: () => B) => B} onNone
 * @property {(v: any) => boolean} equals
 * @property {() => None} empty
 * @property {(d: (a: A) => void) => void} effect
*/

/**
 * @template A
 * @typedef Just
 * @property {() => A} get
 * @property {<B>(f: (a: A) => B) => Just<B>} map
 * @property {(f: (a: A) => any) => any} flatMap
 * @property {() => boolean} isJust
 * @property {() => boolean} isNone
 * @property {<B>(f: () => B) => A} onNone
 * @property {(v: any) => boolean} equals
 * @property {() => None} empty
 * @property {(d: (a: A) => void) => void} effect
 */

/** 
 * @template A
 * @typedef {Just<A> | None} Maybe
 */

const None = {
    map: (f) => None,
    flatMap: (f) => f(),
    get: () => undefined,
    isJust: () => false,
    isNone: () => true,
    onNone: (f) => f(),
    equals: (v) => v && v.isNone && v.isNone(),
    empty: () => None,
    effect: (f) => None,
}

const Just = (value) => {
    return {
        map: (f) => Just(f(value)),
        flatMap: (f) => f(value),
        get: () => value,
        isJust: () => true,
        isNone: () => false,
        onNone: (f) => value,
        equals: (v) => v && v.isJust && v.isJust() && equals(value,v.get()),
        empty: () => None,
        effect: (f) => {
            f(value)
            return Just(value)
        },
    }
}

const Maybe = {
    None: () => None,
    Just,
    empty: () => None,
    fromFalsy: (data) => data ? Just(data) : None
}

export default Maybe