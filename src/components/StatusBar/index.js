import React from 'react'
import { merge } from 'ramda';
import { mapKeys } from 'core/utils/functions';
import { getClassName } from 'core/utils/css-class'
import "./style.scss"

const statusPercentage = (level, max) => {
    return level * 100 / max;
}

const defaultColors = {
    high: "green",
    half: "yellow",
    low: "red"
}

const defaultThresholds = {
    high: 50,
    low : 25
}

const over = (val) => x => x > val
const between = (min,max) => x => x > min && x <= max
const below = (val) => x => x <= val

const getLevelColors = (colors) => mapKeys( key => `--${key}-level`, merge(defaultColors, colors))

const StatusBar = (props) => {
    const { 
        maxLevel = 100, 
        colors = defaultColors,
        breakpoints = defaultThresholds,
        statusLevel = 100,
        statusName
    } = props;

    const {
        high, low
    } = breakpoints

    const statusPercent = statusPercentage(statusLevel, maxLevel)

    const barClass = getClassName({
        "bar": true,
        "bar--high-level": over(high)(statusPercent),
        "bar--half-level": between(low,high)(statusPercent),
        "bar--low-level":  below(low)(statusPercent)
    });

    return (
        <div className="barContainer">
            <span className="statusName">{statusName}</span>
            <div className={barClass} style={getLevelColors(colors)}>
                <div className="inner-bar" style={{width: `${statusPercentage(statusLevel, maxLevel)}%`}}></div>
            </div>
            <span>{statusLevel}/{maxLevel}</span>
        </div>
    )
} 

export const Oxygen = {
    high: "#A1E9FF"
}

export const Water = {
    high: "#1A67EE" 
}

export const Stamina = {
    high: "yellow"
}

export const Colors = {
    OXYGEN: Oxygen, 
    WATER: Water,
    STAMINA: Stamina
}

export default StatusBar;