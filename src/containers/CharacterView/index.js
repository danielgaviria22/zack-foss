import React from "react"
import { getClassName } from "core/utils/css-class"
import StatusBars from "containers/StatusBars"
import EffectIcons from "containers/EffectIcons"
import "./style.scss"

const CharacterView = () => {
    const root = getClassName({
        base: "character-view"
    })
    return <div className={root}>
        <StatusBars />
        <EffectIcons />
    </div>
}

export default CharacterView