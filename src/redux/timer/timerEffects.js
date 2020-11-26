import { dotPath, randomInteger } from 'core/utils/functions'
import { Maybe, Reader } from 'jazzi';
import { prop } from 'ramda';
import { changeStat, triggerEffect } from 'redux/status';
import { Counters, Flags, Status, Effects, CityEvents, Locations } from 'core/constants';
import { triggerFlag } from 'redux/flags';
import { addFixedLine } from 'redux/actionLog';
import { reduceCooldown } from 'redux/cooldowns';
import i18n from  "../../i18n"

const stateReader = Reader.of( state => ({
    getLocation: () => prop("location",state),
    getCounter: (counter) =>  dotPath(`counters.${counter}`,state),
    getFlag: (flag) =>  dotPath(`flags.${flag}`,state),
    getStat: (stat) => dotPath(`character.stats.${stat}`,state),
    getEffect: (effect) => dotPath(`character.effects.${effect}`,state),
    anyFlags: (...flags) => flags.map(flag => dotPath(`flags.${flag}`,state)).some(x => x),
    getStatTuple: (stat) => [ stat, `MAX_${stat}`].map(x => dotPath(`character.stats.${x}`,state)),
    isStatMaxed : (stat) => [ stat, `MAX_${stat}`].map(x => dotPath(`character.stats.${x}`,state)).reduce((x,y) => x === y),
    getCooldowns: () => prop("cooldowns",state) || []
}))

const checkOxygen = stateReader.map(({ getFlag, getStat, getEffect, isStatMaxed }) => {
    const AutoBreathe = getFlag(Flags.AutoBreathe);
    const Oxygen = getStat(Status.Oxygen)
    const HP = getStat(Status.HP)
    const Asphyxia = getEffect(Effects.Asphyxia)
    const isOxygenStill = isStatMaxed(Status.Oxygen) && AutoBreathe
    const oxygenChange =  isOxygenStill ? [] : [changeStat(Status.Oxygen, -1 + (AutoBreathe ? 2 : 0))]
    const maybeDamage  = Maybe.from(HP && !Oxygen)
                            .map(() => changeStat(Status.HP,-1))
                            .map(act => Asphyxia ? [act] : [act,triggerEffect(Effects.Asphyxia)])
    const maybeRemoveEffect = Maybe.from(maybeDamage.isNone() && Asphyxia)
                            .map(() => [triggerEffect(Effects.Asphyxia)])
    return Maybe.from(oxygenChange).concat(maybeDamage).concat(maybeRemoveEffect)
})

const checkDeath = stateReader.map(({ getStat, getEffect }) => {
    const HP = getStat(Status.HP);
    const Death = getEffect(Effects.Death)
    return Maybe.from(!HP && !Death)
                .map(() => [
                    triggerEffect(Effects.Death),
                    addFixedLine(i18n.t("location:death"))
                ])
})

const checkAutoBreathUnlock = stateReader.map(({ getFlag, getCounter }) => {
    const unlocked = getFlag(Flags.AutoBreatheUnlocked);
    return Maybe.from(!unlocked)
        .chain(() => {
            const breaths = getCounter(Counters.Breaths);
            const action = triggerFlag(Flags.AutoBreatheUnlocked)
            const msgAction = addFixedLine(i18n.t("location:startingPoint.autoBreatheOn"))
            return Maybe.fromPredicate(() => breaths >= 3, [action, msgAction])
        })
})

const checkTravelUnlock = stateReader.map(({ getCounter, getFlag }) => {
    const breaths = getCounter(Counters.Breaths);
    const unlocked = getFlag(Flags.TravelUnlocked)
    return Maybe.from(!unlocked && breaths >= 5)
                .chain(() => Maybe.from(randomInteger(0,10) === 7))
                .map(() => [
                    triggerFlag(Flags.TravelUnlocked),
                    addFixedLine(i18n.t("location:startingPoint.chooseDestination"))
                ])
})

const checkCityEvents = stateReader.map(({ getLocation, anyFlags }) => {
    const isInCity = getLocation() === Locations.City
    const isCityEventActive = anyFlags(
        Flags.Hunger,
        Flags.SuspiciousVendor,
        Flags.Suitcase
    )
    
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
            default:
                return [ CityEvents.SuspiciousVendor ,[ triggerFlag(Flags.SuspiciousVendor) ]]
        }
    }

    return Maybe.from(isInCity && !isCityEventActive)
        .chain(() => Maybe.from(randomInteger(0,50) === 25))
        .map(getRandomCityEvent)
        .map(([ evt, acts ]) => [ ...acts, addFixedLine(i18n.t(`location:city.randomEvents.${evt}.find`))])
})

const checkCooldowns = stateReader.map(({ getCooldowns }) => {
    return Maybe.fromArray(getCooldowns().map(skill => reduceCooldown(skill.id)))
})

const calculateActions = Reader.do(function*(){
    const oxygen       = yield checkOxygen;
    const death        = yield checkDeath;
    const autoBreath   = yield checkAutoBreathUnlock;
    const travelUnlock = yield checkTravelUnlock;
    const cityEvents   = yield checkCityEvents;
    const cooldowns    = yield checkCooldowns;

    const maybeActions = [
        oxygen, death, autoBreath,
        travelUnlock, cityEvents, cooldowns
    ];

    return Maybe.accumulate(maybeActions).get();
})

export default calculateActions;