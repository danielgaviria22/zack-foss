import React from 'react'
import { useStat } from 'core/hooks/state'
import { getClassName } from 'core/utils/css-class';
import StatusBar from 'components/StatusBar';
import { Stats } from './constants'
import { useTranslation } from 'react-i18next';
import "./style.scss"

const Bar = ({ stat, statusName, colors }) => {
    const [ value, maxValue ] = useStat(stat);
    return <StatusBar 
        statusName={statusName}
        statusLevel={value}
        maxLevel={maxValue}
        colors={colors}
    />
}

const StatusBars = () => {

    const { t } = useTranslation("stats")

    const rootClass = getClassName({
        base: "status-bars"
    })

    return <div className={rootClass}>
       { Stats.map(({ stat, colors }) => {
            const name = t(stat)
            return <Bar 
                key={stat}
                statusName={name}
                stat={stat}
                colors={colors}
            />
       })}
    </div>
}

export default StatusBars;