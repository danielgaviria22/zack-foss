import { Maybe } from '@juan-utils/ramda-structures'
import { F as False, always, prop, sortBy, identity as I, binary } from "ramda"
import { propNeq } from "core/utils/functions"

const sortById = sortBy(prop("id"));
const identity = binary(I);
/**
 * @template T
 * @typedef Inventory
 * @property {(id: string) => Maybe<T>} get
 * @property {(id: string) => T} getItem
 * @property {(id: string) => boolean} hasItem
 * @property {(id: string, pred: (item: T) => boolean) => boolean} itemSatisfies
 * @property {(...ids: string[]) => T[]} queryItems
 * @property {() => T[]} getAvailableItems
 * @property {(id: string, amount: number) => any} changeAmount
 */
/**
 * Create an inventory object
 * @typedef {{ id: string, amount?: number, [x: string]: any}} A
 * @param {Array<A>} data 
 * @param {(id: string, amount: number) => any} updateFn 
 * @returns {Inventory<A>}
 */
const createInventory = (data, updateFn=identity) => {
    const zeroItem = id => ({ id , amount: 0 })
    const get = (id) => Maybe.fromFalsy(data.find(item => item.id === id))
    const getItem = (id) => get(id).onNone(always(zeroItem(id)))

    return {
        get,
        getItem,
        hasItem: (id) => {
            return get(id)
                .map(propNeq("amount",0))
                .onNone(False)
        },
        itemSatisfies: (id,pred) => {
            return get(id)
                .map(pred)
                .onNone(always(pred(zeroItem(id))))
        },
        queryItems: (...ids) => ids.map(getItem),
        getAvailableItems: () => sortById(data),
        changeAmount: (id, amount) => updateFn(id,amount)
    }
} 

const Inventory = {
    fromArray: createInventory
}

export default Inventory