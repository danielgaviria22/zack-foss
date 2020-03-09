import { propOr } from 'ramda'
import { unaryActionCreator, nullaryActionCreator } from '../../utils/redux-utils';

const getOr0 = (res,state) => propOr(0)(res)(state)

export const RESOURCE = 'zack-foss/resource'
export const LOAD_RESOURCES = 'zack-foss/load-resource'
export const RESET_RESOURCES = 'zack-foss/reset-resources'

export default function reducer(prevState={},action){
    const { type, payload } = action;
    switch(type){
        case RESOURCE:
            const { resource , amount } = payload;
            return {
                ...prevState,
                [resource]: getOr0(resource,prevState) + amount,
            }
        case LOAD_RESOURCES:
            return payload;
        case RESET_RESOURCES:
            return {}
        default:
            return prevState;
    }
}

export const changeResourceAmount = (resType, amount) => {
    return {
        type: RESOURCE,
        payload: {
            resource: resType,
            amount,
        }
    }
}

export const loadResources = unaryActionCreator(LOAD_RESOURCES)
export const resetResources = nullaryActionCreator(RESET_RESOURCES);