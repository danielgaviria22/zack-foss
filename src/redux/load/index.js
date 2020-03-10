import { nullaryActionCreator, unaryActionCreator } from "core/utils/redux-utils"

export const LOAD = "zack-foss/load"
export const INJECT = "zack-foss/inject"
export const INJECT_ERROR = "zack-foss/inject-error"

export const loadState = nullaryActionCreator(LOAD)
export const injectState = unaryActionCreator(INJECT)
export const injectionError = unaryActionCreator(INJECT_ERROR)