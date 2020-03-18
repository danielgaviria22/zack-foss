import React from 'react'
import { getClassName } from 'core/utils/css-class'
import "./style.scss"

const Button = (props) => {
    const {children, onClick, disabled, loadingTime} = props;

    const baseClass = getClassName({
        "button": true,
        "button--disabled": disabled,
        "button--loading": loadingTime > 0
    })

    return (
        <button onClick={onClick} className={baseClass} disabled={disabled || loadingTime > 0}>
            {children}
            <div className="loading-block" style={{width: `${loadingTime}%`}}></div>
        </button>
    )
}


export default Button