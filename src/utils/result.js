import { equals } from "ramda"

const _Error = (value) => {
    return {
        map: (f) => _Error(value),
        get: () => value,
        isOk: () => false,
        isError: () => true,
        onError: (f) => f(value),
        equals: (v) => v && v.get && equals(v.get(),value),
    }
}

const Ok = (value) => {
    return {
        map: (f) => Ok(f(value)),
        get: () => value,
        isOk: () => true,
        isError: () => false,
        onError: (f) => value,
        equals: (v) => v && v.get && equals(v.get(),value),
    }
}

const Result = {
    Error: _Error,
    Ok
}

Result.fromError = (e) => e instanceof Error ? _Error(e) : Ok(e);

export default Result