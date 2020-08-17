import React from 'react'
import { getClassName } from 'core/utils/css-class'
import "./style.scss"

const EffectIcon = (props) => {
    const root = getClassName({
        base: "effect"
    })
    return <div className={root}></div>
}

export default EffectIcon