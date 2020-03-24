import React, { useState } from 'react'
import { getClassName } from 'core/utils/css-class'
import { identity } from 'ramda';
import "./style.scss"

const Button = (props) => {
    const { 
        children, 
        disabled, 
        loadingTime=5,
        onClick=identity, 
        onAnimationEnd=identity,
    } = props;

    const [ loading, setLoading ] = useState(false);

    const baseClass = getClassName({
        "button": true,
        "button--loading": loading,
        "button--disabled": disabled || loading
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
                style={{ animationDuration: `${loadingTime}s`}}
                onAnimationEnd={handleAnimationEnd}
            />
        </button>
    )
}


export default Button