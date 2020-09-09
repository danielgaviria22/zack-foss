import { createReducer, unaryActionCreator } from "core/utils/redux-utils"
import { compose, nthArg, prop } from "ramda"

export const CHANGE_LOCATION = "zack-foss/change-location"

export default createReducer({
    [CHANGE_LOCATION]: compose( prop("payload") , nthArg(1))
})

export const changeLocation = unaryActionCreator(CHANGE_LOCATION)