import React from 'react';
import { getClassName } from 'core/utils/css-class';
import "./style.scss"

const Spinner = () => {
    const root = getClassName({
        base: "spinner"
    })

    const dotClass = root.extend("&__dot");

    return <div className={root}>
        <div className={dotClass}></div>
        <div className={dotClass}></div>
        <div className={dotClass}></div>
    </div>
}

export default Spinner