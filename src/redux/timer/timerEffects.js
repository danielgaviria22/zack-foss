import { dotPath } from 'core/utils/functions'
import { Maybe } from '@juan-utils/ramda-structures';
import { changeStat } from 'redux/status';
import { Counters, Flags, Status } from 'core/constants';
import { triggerFlag } from 'redux/flags';
import { addFixedLine } from 'redux/actionLog';
import i18n from  "../../i18n"

const getCounter = (counter,state) => dotPath(`counters.${counter}`,state)
const getFlag = (flag,state) => dotPath(`flags.${flag}`,state)
// const getEffect = (effect,state) => dotPath(`character.effects.${effect}`,state)
const getStat = (stat,state) => dotPath(`character.stats.${stat}`,state)

export const checkOxygen = (state) => {
    let actions = []
    const AutoBreathe = getFlag(Flags.AutoBreathe,state);
    const Oxygen = getStat(Status.Oxygen,state)
    actions.push(changeStat(Status.Oxygen,-1))
    if( AutoBreathe ){
        actions.push(changeStat(Status.Oxygen,2))
    }
    if( !Oxygen ){
        actions.push(changeStat(Status.HP,-1))
    }
    return Maybe.fromArray(actions)
}

export const checkAutoBreathUnlock = (state) => {
    const unlocked = getFlag(Flags.AutoBreatheUnlocked,state);
    if( !unlocked ){
        const breaths = getCounter(Counters.Breaths,state);
        const action = triggerFlag(Flags.AutoBreatheUnlocked)
        const addMsgAction = act => [act, addFixedLine(i18n.t("location:startingPoint.autoBreatheOn"))]
        return Maybe.fromPredicate(() => breaths >= 3, action)
                    .map(addMsgAction)
    }
    return Maybe.None()
}