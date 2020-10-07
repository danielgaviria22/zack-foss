import React, { useState } from 'react'
import getClassName from "getclassname"
import { identity } from 'ramda';
import "./style.scss"

const Button = (props) => {
    const { 
        children, 
        disabled, 
        shy,
        fluid,
        cooldown=5,
        onClick=identity, 
        onAnimationEnd=identity,
    } = props;

    const [ loading, setLoading ] = useState(false);

    const baseClass = getClassName({
        "button": true,
        "button--loading": loading,
        "button--disabled": disabled || loading,
        "button--shy": shy,
        "button--fluid": fluid,
    })

    const loadingBlockClass = getClassName({
        "loading-block": true,
        "loading-block--loading": loading,
    })

    const handleClick = () => {
        !disabled && setLoading(true)
        onClick()
    }

    const handleAnimationEnd = () => {
        setLoading(false);
        onAnimationEnd()
    }

    return (
        <button 
            onClick={handleClick} 
            className={baseClass} 
            disabled={disabled || loading}
        >
            {children}
            <div 
                className={loadingBlockClass} 
                style={{ animationDuration: `${cooldown}s`}}
                onAnimationEnd={handleAnimationEnd}
            />
        </button>
    )
}


export default Button