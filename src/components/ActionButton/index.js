import React from 'react'
import { getClassName } from 'core/utils/css-class'
import { identity } from 'ramda';
import { useCooldown } from 'core/hooks/state';
import { useDispatch } from 'react-redux';
import { setCooldown } from 'redux/cooldowns';
import "./style.scss"

const ActionButton = (props) => {
    const { 
        children, 
        disabled, 
        shy,
        fluid,
        action,
        cooldown=5,
        onClick=identity,
    } = props;

    const dispatch = useDispatch()
    const { amount, loading, max } = useCooldown(action)

    const baseClass = getClassName({
        base: "action-button",
        "&--loading": loading,
        "&--disabled": disabled || loading,
        "&--shy": shy,
        "&--fluid": fluid,
    })

    const loadingBlockClass = getClassName({
        "loading-block": true,
        "loading-block--loading": loading,
    })

    const handleClick = () => {
        !disabled && dispatch(setCooldown(action,cooldown))
        onClick()
    }

    const percentage = ((amount) * 100 / max);

    const s = loading ? { width: `${percentage}%` } : {}

    return (
        <button 
            onClick={handleClick} 
            className={baseClass} 
            disabled={disabled || loading}
        >
            {children}
            <div 
                className={loadingBlockClass} 
                style={s}
            />
        </button>
    )
}


export default ActionButton