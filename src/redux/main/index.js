import { createReducer, nullaryActionCreator } from "core/utils/redux-utils"

export const MAKE_MAIN = "zack-foss/make-main"
export const MAKE_SECONDARY = "zack-foss/make-secondary"

export default createReducer({
    [MAKE_MAIN]: () => true,
    [MAKE_SECONDARY]: () => false
})

export const makeMain = nullaryActionCreator(MAKE_MAIN)
export const makeSecondary = nullaryActionCreator(MAKE_SECONDARY)