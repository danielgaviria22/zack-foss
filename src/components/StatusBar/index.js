import React from 'react'
import { getClassName } from 'core/utils/css-class'
import "./style.scss"

const statusPercentage = (level, max) => {
    return level * 100 / max;
}

const StatusBar = ({...props}) => {
    const { 
        maxLevel = 100, 
        statusName="Oxygen",
        statusLevel = 100
    } = props;

    const barClass = getClassName({
        "bar": true,
        [statusName]: true,
        "bar--halfLevel": statusPercentage(statusLevel, maxLevel) <= 50,
        "bar--lowLevel": statusPercentage(statusLevel, maxLevel) <= 25
    });

    return (
        <div className="barContainer">
            <span className="statusName">{statusName}</span>
            <div className={barClass}>
                <div style={{width: `${statusPercentage(statusLevel, maxLevel)}%`}}></div>
            </div>
            <span>{statusLevel}/{maxLevel}</span>
        </div>
    )
} 

export default StatusBar;