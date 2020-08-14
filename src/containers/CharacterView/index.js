import React from "react"
import { getClassName } from "core/utils/css-class"

const CharacterView = () => {
    const root = getClassName({
        base: "character-view"
    })
    return (<div className={root}>
    </div>)
}

export default CharacterView