import { propOr } from 'ramda'
import { 
    unaryActionCreator, 
    nullaryActionCreator, 
    createReducer, 
    loadState, 
    resetState, 
    nAryActionCreator 
} from 'core/utils/redux-utils';

const getOr0 = (res,state) => propOr(0,res,state)

export const RESOURCE = 'zack-foss/resource'
export const LOAD_RESOURCES = 'zack-foss/load-resource'
export const RESET_RESOURCES = 'zack-foss/reset-resources'

export default createReducer({
    [RESOURCE]: (prevState, action) => {
        const { resource , amount } = action.payload;
        return {
            ...prevState,
            [resource]: getOr0(resource,prevState) + amount,
        }
    },
    [LOAD_RESOURCES]: loadState,
    [RESET_RESOURCES]: resetState
})

export const changeResourceAmount = nAryActionCreator(RESOURCE,(resource,amount) => ({
    resource, 
    amount
}))
export const loadResources = unaryActionCreator(LOAD_RESOURCES)
export const resetResources = nullaryActionCreator(RESET_RESOURCES);