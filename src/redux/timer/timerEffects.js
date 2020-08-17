import { dotPath } from 'core/utils/functions'
import { changeStat, changeEffect } from 'redux/status';
import { addTemporalLine } from 'redux/actionLog';
import { Effects } from 'redux/status/constants';

const getEffect = (effect,state) => dotPath(`character.effects.${effect}`,state)

export const checkOxygen = (state) => {
    const {
        OXYGEN, HP, MAX_OXYGEN
    } = dotPath("character.stats",state);

    const Asphyxia = getEffect(Effects.Asphyxia,state)
    const Dizzy = getEffect(Effects.Dizzy,state)
    
    let actions = []
    
    if( OXYGEN > 0 ){
        actions.push(changeStat("OXYGEN",-10))
    }

    if( HP > 10 && OXYGEN <= 0){
        actions.push(changeStat("HP",-1))
        if( !Asphyxia ){
            actions.push(changeEffect(Effects.Asphyxia,1))
            actions.push(addTemporalLine("You start getting hurt from holding your breath"))
        }
    } else if( HP <= 10 && OXYGEN <= 0 ) {
        actions.push(changeStat("OXYGEN",MAX_OXYGEN))
        actions.push(addTemporalLine("You can no longer hold your breath and your body forcibly makes you inhale deeply..."))
        if( Asphyxia > 0 ){
            actions.push(changeEffect(Effects.Asphyxia,-1))
        }
    }

    if( OXYGEN <= 0 && !Dizzy ){
        actions.push(changeEffect(Effects.Dizzy,10))
        actions.push(addTemporalLine("You start to feel dizzy"))
    }
    return actions
}

export const checkEffects = (state) => {
    const Dizzy = getEffect(Effects.Dizzy,state)
    if( Dizzy > 0 ) {
        const actions = [changeEffect(Effects.Dizzy,-1)]
        if( Dizzy === 1 ){
            actions.push(addTemporalLine("You feel you regain your composture"))
        }
        return actions
    } 
}