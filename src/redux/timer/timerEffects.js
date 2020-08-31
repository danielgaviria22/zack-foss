import { dotPath } from 'core/utils/functions'
import { changeStat } from 'redux/status';
import { Counters, Flags, Status } from 'redux/status/constants';
import { triggerFlag } from 'redux/flags';
import { Maybe } from '@juan-utils/ramda-structures';

const getCounter = (counter,state) => dotPath(`counters.${counter}`,state)
const getFlag = (flag,state) => dotPath(`flags.${flag}`,state)
// const getEffect = (effect,state) => dotPath(`character.effects.${effect}`,state)
// const getStat = (stat,state) => dotPath(`character.stats.${stat}`,state)

export const checkOxygen = (state) => {
    let actions = []
    const AutoBreathe = getFlag(Flags.AutoBreathe,state);
    actions.push(changeStat(Status.Oxygen,-1))  
    if( AutoBreathe ){
        actions.push(changeStat(Status.Oxygen,2))
    }
    return Maybe.fromArray(actions)
}

export const checkAutoBreathUnlock = (state) => {
    const unlocked = getFlag(Flags.AutoBreatheUnlocked,state);
    if( !unlocked ){
        const breaths = getCounter(Counters.Breaths,state);
        const action = triggerFlag(Flags.AutoBreatheUnlocked)
        return Maybe.fromPredicate(() => breaths >= 10, action)
    }
    return Maybe.None()
}