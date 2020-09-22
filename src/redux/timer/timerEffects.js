import { dotPath, randomInteger } from 'core/utils/functions'
import { Maybe } from '@juan-utils/ramda-structures';
import { prop } from 'ramda';
import { changeStat, triggerEffect } from 'redux/status';
import { Counters, Flags, Status, Effects, CityEvents, Locations } from 'core/constants';
import { triggerFlag } from 'redux/flags';
import { addFixedLine } from 'redux/actionLog';
import { reduceCooldown } from 'redux/cooldowns';
import i18n from  "../../i18n"

const getLocation = prop("location")
const getCounter = (counter,state) => dotPath(`counters.${counter}`,state)
const getFlag = (flag,state) => dotPath(`flags.${flag}`,state)
const getStat = (stat,state) => dotPath(`character.stats.${stat}`,state)
const getEffect = (effect,state) => dotPath(`character.effects.${effect}`,state)
const anyFlags = (...flags) => (state) => flags.map(flag => getFlag(flag,state)).some(x => x);
const getStatTuple = (stat,state) => [ stat, `MAX_${stat}`].map(x => getStat(x,state))
const isStatMaxed = (stat,state) => getStatTuple(stat,state).reduce((x,y) => x === y)

export const checkOxygen = (state) => {
    const AutoBreathe = getFlag(Flags.AutoBreathe,state);
    const Oxygen = getStat(Status.Oxygen,state)
    const HP = getStat(Status.HP,state)
    const Asphyxia = getEffect(Effects.Asphyxia,state)
    const isOxygenStill = isStatMaxed(Status.Oxygen,state) && AutoBreathe
    const oxygenChange =  isOxygenStill ? [] : [changeStat(Status.Oxygen, -1 + (AutoBreathe ? 2 : 0))]
    const maybeDamage  = Maybe.from(HP && !Oxygen)
                            .map(() => changeStat(Status.HP,-1))
                            .map(act => Asphyxia ? act : [act,triggerEffect(Effects.Asphyxia)])
    const maybeRemoveEffect = Maybe.from(maybeDamage.isNone() && Asphyxia)
                            .map(() => triggerEffect(Effects.Asphyxia))
    return Maybe.from(oxygenChange).concat(maybeDamage).concat(maybeRemoveEffect)
}

export const checkDeath = (state) => {
    const HP = getStat(Status.HP,state);
    const Death = getEffect(Effects.Death,state)
    return Maybe.from(!HP && !Death)
                .map(() => [
                    triggerEffect(Effects.Death),
                    addFixedLine(i18n.t("location:death"))
                ])
}

export const checkAutoBreathUnlock = (state) => {
    const unlocked = getFlag(Flags.AutoBreatheUnlocked,state);
    return Maybe.from(!unlocked)
        .chain(() => {
            const breaths = getCounter(Counters.Breaths,state);
            const action = triggerFlag(Flags.AutoBreatheUnlocked)
            const msgAction = addFixedLine(i18n.t("location:startingPoint.autoBreatheOn"))
            return Maybe.fromPredicate(() => breaths >= 3, [action, msgAction])
        })
}

export const checkTravelUnlock = (state) => {
    const breaths = getCounter(Counters.Breaths,state);
    const unlocked = getFlag(Flags.TravelUnlocked,state)
    return Maybe.from(!unlocked && breaths >= 5)
                .chain(() => Maybe.from(randomInteger(0,10) === 7))
                .map(() => [
                    triggerFlag(Flags.TravelUnlocked),
                    addFixedLine(i18n.t("location:startingPoint.chooseDestination"))
                ])
}

export const checkCityEvents = (state) => {
    const isInCity = getLocation(state) === Locations.City
    const isCityEventActive = anyFlags(
        Flags.Hunger,
        Flags.SuspiciousVendor,
        Flags.Suitcase
    )(state)

    const getRandomCityEvent = () => {
        switch(randomInteger(0,3)) {
            case 0 :
                return [ CityEvents.Hunger, [
                    triggerFlag(Flags.Hunger),
                    triggerEffect(Effects.Hunger),
                ]]
            case 1 :
                return [ CityEvents.Suitcase, [ triggerFlag(Flags.Suitcase) ]]
            case 2 :
                return [CityEvents.SuspiciousVendor ,[ triggerFlag(Flags.SuspiciousVendor) ]]
            default:
                return ["NoEvent",[]]
        }
    }

    return Maybe.from(isInCity && !isCityEventActive)
        .chain(() => Maybe.from(randomInteger(0,50) === 25))
        .effect(() => console.group("TO DO: Remove effects"))
        .effect(() => console.log("Event is happening get ready!"))
        .map(getRandomCityEvent)
        .effect(([evt]) => console.log(`Chosen event:`,evt))
        .effect(() => console.groupEnd())
        .map(([ evt, acts ]) => [ ...acts, addFixedLine(i18n.t(`location:city.randomEvents.${evt}.find`))])
}

export const reduceCooldowns = (state) => {
    return Maybe.fromArray(state.cooldowns.map(skill => reduceCooldown(skill.id)))
}