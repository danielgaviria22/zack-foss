import React, { useState } from 'react'
import { getClassName } from 'core/utils/css-class'
import { Effects } from 'redux/status/constants';
import { propOr, __ } from 'ramda';

import AsphyxiaIcon from './icons/asphyxia.svg';
import DizzyIcon from './icons/dizzy.svg';
import Unkown from './icons/unkown.svg';
import "./style.scss"


const getIconOrUnkown = propOr(Unkown,__,{
    [Effects.Asphyxia]: AsphyxiaIcon,
    [Effects.Dizzy]: DizzyIcon,
});

const Icon = ({ name }) => {
    const src = getIconOrUnkown(name);
    return <img src={src} alt={name}/>
}

const EffectIcon = ({ name }) => {
    const [ hover, setHover ] = useState(false)
    
    const root = getClassName({
        base: "effect"
    })

    const tooltipClass = root.extend("&__tooltip").recompute({
        "&--visible": hover
    })

    return <div 
        className={root}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
    >
        <span className={tooltipClass}>{name}</span>
        <Icon name={name} />
    </div>
}

export default EffectIcon