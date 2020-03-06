import { useSelector } from "react-redux"
import { prop } from 'ramda';
import { dotPathOr } from "./functions";

export const useAllFlags = () => useSelector(prop("flags"))
export const useAllResources = () => useSelector(prop("resources"))

export const useFlag = (flagName) => {
    return useSelector(dotPathOr(false,`flags.${flagName}`),)
}

export const useResource = (resourceName) => {
    return useSelector(dotPathOr(0,`resources.${resourceName}`))
}