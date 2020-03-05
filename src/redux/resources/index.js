import { propOr } from 'ramda'

const getOr0 = (res,state) => propOr(0)(res)(state)

export const RESOURCE = 'zack-foss/resource'
export const LOAD_RESOURCES = 'zack-foss/load-resource'

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

export const loadResources = (payload) => {
    return {
        type: LOAD_RESOURCES,
        payload,
    }
}