import { dotPath } from 'core/utils/functions'
import { changeStat, changeEffect } from 'redux/status';
import { addTemporalLine } from 'redux/actionLog';

export const checkOxygen = (state) => {
    const {
        OXYGEN, HP, MAX_OXYGEN
    } = dotPath("character.stats",state);
    
    let actions = []
    
    if( OXYGEN > 0 ){
        actions.push(changeStat("OXYGEN",-1))
    }

    if( HP > 10 && OXYGEN <= 0){
        actions.push(changeStat("HP",-1))
        if( !dotPath("character.effects.oxygenDepraved",state) ){
            actions.push(changeEffect("oxygenDepraved",1))
            actions.push(addTemporalLine("You start getting hurt from holding your breath"))
        }
    } else if( HP <= 10 && OXYGEN <= 0 ) {
        actions.push(changeStat("OXYGEN",MAX_OXYGEN))
        actions.push(addTemporalLine("You can no longer hold your breath and your body forcibly makes you inhale deeply..."))
        if( dotPath("character.effects.oxygenDepraved",state) > 0 ){
            actions.push(changeEffect("oxygenDepraved",-1))
        }
    }

    if( OXYGEN <= 0 && !dotPath("character.effects.dizzy",state) ){
        actions.push(changeEffect("dizzy",10))
        actions.push(addTemporalLine("You start to feel dizzy"))
    }
    return actions
}

export const checkEffects = (state) => {
    const {
        dizzy
    } = dotPath("character.effects",state)
    if( dizzy > 0 ) {
        const actions = [changeEffect("dizzy",-1)]
        if( dizzy === 1 ){
            actions.push(addTemporalLine("You feel you regain your composture"))
        }
        return actions
    } 
}