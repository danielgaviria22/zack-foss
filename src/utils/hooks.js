import { useSelector } from "react-redux"
import { pathOr as _pathOr , prop } from 'ramda';

const pathOr = (or,p) => _pathOr(or,p.split("."));

export const useAllFlags = () => useSelector(prop("flags"))
export const useAllResources = () => useSelector(prop("resources"))

export const useFlag = (flagName) => {
    return useSelector(pathOr(false,`flags.${flagName}`),)
}

export const useResource = (resourceName) => {
    return useSelector(pathOr(0,`resources.${resourceName}`))
}