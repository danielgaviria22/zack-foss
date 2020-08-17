import React from 'react'
import { useCharacterStats } from 'core/hooks/state'
import { getClassName } from 'core/utils/css-class';
import StatusBar , { Oxygen } from 'components/StatusBar';
import "./style.scss"

const StatusBars = (props) => {
    const characterStatus = useCharacterStats();
    const rootClass = getClassName({
        base: "status-bars"
    })

    const {
        OXYGEN, MAX_OXYGEN,
        HP, MAX_HP,
    } = characterStatus

    return <div className={rootClass}>
        <StatusBar 
            statusName="HP"
            statusLevel={HP}
            maxLevel={MAX_HP}
        />
        <StatusBar 
            statusName="Oxygen"
            statusLevel={OXYGEN}
            maxLevel={MAX_OXYGEN}
            colors={Oxygen} 
        />
    </div>
}

export default StatusBars;