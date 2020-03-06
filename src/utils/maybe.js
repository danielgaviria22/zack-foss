const None = () => {
    return {
        map: (f) => None(),
        flatMap: (f) => f(),
        get: () => undefined,
        isJust: () => false,
        isNone: () => true,
        onNone: (f) => f(),
        effect: (f) => None(),
    }
}

const Just = (value) => {
    return {
        map: (f) => Just(f(value)),
        flatMap: (f) => f(value),
        get: () => value,
        isJust: () => true,
        isNone: () => false,
        onNone: (f) => value,
        effect: (f) => {
            f(value)
            return Just(value)
        },
    }
}

const Maybe = {
    None,
    Just
}

Maybe.fromFalsy = (data) => data ? Just(data) : None();

export default Maybe