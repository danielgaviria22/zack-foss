import { equals } from "ramda"

const None = (() => {
    return {
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
})()

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
}

Maybe.fromFalsy = (data) => data ? Just(data) : None;

export default Maybe