import { dotPath } from 'core/utils/functions'
import { changeStat, changeEffect } from 'redux/status';
import { addTemporalLine } from 'redux/actionLog';
import { Effects, Counters, Flags, Status } from 'redux/status/constants';
import { triggerFlag } from 'redux/flags';
import { Maybe } from '@juan-utils/ramda-structures';

const getEffect = (effect,state) => dotPath(`character.effects.${effect}`,state)
const getCounter = (counter,state) => dotPath(`counters.${counter}`,state)
const getFlag = (flag,state) => dotPath(`flags.${flag}`,state)
const getStat = (stat,state) => dotPath(`character.stats.${stat}`,state)

export const checkOxygen = (state) => {
    const {
        OXYGEN, HP, MAX_OXYGEN
    } = dotPath("character.stats",state);

    const Asphyxia = getEffect(Effects.Asphyxia,state)
    const Dizzy = getEffect(Effects.Dizzy,state)
    const AutoBreathe = getFlag(Flags.AutoBreathe,state);
    
    let actions = []

    const BREATHE_RATE = 2
    if( AutoBreathe && OXYGEN <= MAX_OXYGEN - BREATHE_RATE ) {
        actions.push(changeStat(Status.Oxygen,BREATHE_RATE))
    }
    
    actions.push(changeStat(Status.Oxygen,-1))  

    if( HP > 10 && OXYGEN <= 0){
        actions.push(changeStat("HP",-1))
        if( !Asphyxia ){
            actions.push(changeEffect(Effects.Asphyxia,1))
            actions.push(addTemporalLine("You start getting hurt from holding your breath"))
        }
    } else if( HP <= 10 && OXYGEN <= 0 ) {
        actions.push(changeStat("OXYGEN",MAX_OXYGEN))
        actions.push(addTemporalLine("You can no longer hold your breath and your body forcibly makes you inhale deeply..."))
    }

    if( OXYGEN <= 10 ){
        actions.push(changeEffect(Effects.Dizzy,10 - (Dizzy || 0)))
        if( !Dizzy ){
            actions.push(addTemporalLine("You start to feel dizzy"))
        }
    }

    if( Asphyxia > 0 && OXYGEN > 0){
        actions.push(changeEffect(Effects.Asphyxia,-1))
    }

    return Maybe.fromArray(actions)
}

export const checkAutoBreathUnlock = (state) => {
    const breaths = getCounter(Counters.Breaths,state);
    if( breaths >= 10 && !getFlag(Flags.AutoBreatheUnlocked,state)){
        return Maybe.fromArray([ triggerFlag(Flags.AutoBreatheUnlocked) ])
    }
    return Maybe.None()
}

export const checkEffects = (state) => {
    const Oxygen = getStat(Status.Oxygen,state)
    const Dizzy = getEffect(Effects.Dizzy,state)
    let actions = []
    if( Dizzy > 0 && Oxygen > 10) {
        actions.push(changeEffect(Effects.Dizzy,-1))
        if( Dizzy === 1 ){
            actions.push(addTemporalLine("You feel you regain your composture"))
        }
    }
    return Maybe.fromArray(actions);
}