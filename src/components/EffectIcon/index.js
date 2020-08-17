import React, { useState } from 'react'
import { getClassName } from 'core/utils/css-class'
import "./style.scss"

const EffectIcon = ({ name }) => {
    const [ hover, setHover ] = useState(false)
    
    const root = getClassName({
        base: "effect"
    })

    const tooltipClass = root.extend("&__tooltip").recompute({
        "&--visible": hover
    })

    return <div 
        className={root}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
    >
        <span className={tooltipClass}>{name}</span>
    </div>
}

export default EffectIcon