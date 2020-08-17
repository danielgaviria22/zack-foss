import React from 'react'
import { getClassName } from 'core/utils/css-class'
import EffectIcon from 'components/EffectIcon'
import { useStatusEffects } from 'core/hooks/state'
import { toPairs, nth, head } from 'ramda'
import "./style.scss"

const EffectIcons = (props) => {
    const effects = useStatusEffects();

    const root = getClassName({
        base: "effect-icons"
    })

    return <div className={root}>
        {
            toPairs(effects)
            .filter(nth(1))
            .map(head)
            .map((effect,idx) => <EffectIcon key={idx} name={effect}/>)
        }
    </div>
}

export default EffectIcons