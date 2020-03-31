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

const getLevelColors = (colors) => mapKeys( key => `--${key}-level`, merge(defaultColors, colors))

const StatusBar = (props) => {
    const { 
        maxLevel = 100, 
        colors = defaultColors,
        statusLevel = 100,
        statusName
    } = props;

    const barClass = getClassName({
        "bar": true,
        "bar--high-level": statusPercentage(statusLevel, maxLevel) > 50,
        "bar--half-level": statusPercentage(statusLevel, maxLevel) <= 50,
        "bar--low-level": statusPercentage(statusLevel, maxLevel) <= 25
    });

    return (
        <div className="barContainer">
            <span className="statusName">{statusName}</span>
            <div className={barClass} style={getLevelColors(colors)}>
                <div style={{width: `${statusPercentage(statusLevel, maxLevel)}%`}}></div>
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

export default StatusBar;