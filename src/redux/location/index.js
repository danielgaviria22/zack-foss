import { createReducer, unaryActionCreator, loadState, resetToInitialState } from "core/utils/redux-utils"
import { compose, nthArg, prop } from "ramda"

export const CHANGE_LOCATION = "zack-foss/change-location"
export const LOAD_LOCATION = "zack-foss/load-location"
export const RESET_LOCATION = "zack-foss/reset-location"

export default createReducer({
    [CHANGE_LOCATION]: compose( prop("payload") , nthArg(1)),
    [LOAD_LOCATION]: loadState,
    [RESET_LOCATION]: resetToInitialState("location")
})

export const changeLocation = unaryActionCreator(CHANGE_LOCATION)
export const loadLocation = unaryActionCreator(LOAD_LOCATION);
export const resetLocation = unaryActionCreator(RESET_LOCATION)