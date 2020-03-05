import { defaultTo, prop } from 'ramda'

const getOr0 = (res,state) => defaultTo(0)(prop(res,state))

export const RESOURCE = 'zack-foss/resource'

export default function reducer(prevState={},action){
    const { type, payload } = action;
    switch(type){
        case RESOURCE:
            const { resource , amount } = payload;
            return {
                ...prevState,
                [resource]: getOr0(resource,prevState) + amount,
            }
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