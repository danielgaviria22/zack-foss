import { useSelector, useDispatch } from "react-redux"
import { prop } from 'ramda';
import { dotPathOr } from "core/utils/functions";
import { Inventory } from "core/structures";
import { changeInventory } from "redux/status";

export const useAllFlags = () => useSelector(prop("flags"))
export const useAllResources = () => useSelector(prop("resources"))

/**
 * Gets a flag. Defaults to false.
 * @param {string} flagName 
 * @returns {boolean}
 */
export const useFlag = (flagName) => {
    return useSelector(dotPathOr(false,`flags.${flagName}`),)
}

/**
 * Gets a resource. Defaults to 0
 * @param {string} resourceName 
 * @returns {number}
 */
export const useResource = (resourceName) => {
    return useSelector(dotPathOr(0,`resources.${resourceName}`))
}

/**
 * Gets a character status
 * @returns {{ effects?: any , stats?: any }}
 */
export const useStatus = () => {
    return useSelector(dotPathOr({},`character`))
}

/**
 * Gets a status effect. Defaults to false
 * @param {string} effect
 * @returns {boolean}
 */
export const useStatusEffect = (effect) => {
    return useSelector(dotPathOr(false,`character.effects.${effect}`))
}

/**
 * Gets all character status effects
 * @returns {{ [x: string]: boolean }}
 */
export const useStatusEffects = () => {
    return useSelector(dotPathOr(false,`character.effects`))
}

/**
 * Gets a single character stat. Defaults to 0
 * @param {string} stat 
 * @returns {number}
 */
export const useCharacterStat = (stat) => {
    return useSelector(dotPathOr(0,`character.stats.${stat}`))
}

/**
 * Gets all character stats
 * @returns {{ [x: string]: number }}
 */
export const useCharacterStats = () => {
    return useSelector(dotPathOr({},`character.stats`))
}

/**
 * Gets character inventory
 * @typedef {{ id: string, amount?: number }} Item
 * @returns {import("../../structures/inventory").Inventory<Item>}
 */
export const useInventory = () => {
    const dispatch = useDispatch();
    return Inventory.fromArray(
        useSelector(dotPathOr([],"character.inventory")),
        (id,amount) => dispatch(changeInventory(id,amount))
    );
}