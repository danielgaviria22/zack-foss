import React from 'react'
import Button from 'components/Button';
import { getClassName } from 'core/utils/css-class'
import { useDispatch } from 'react-redux';
import { changeStat } from 'redux/status';
import { Status, Flags, Counters } from 'redux/status/constants';
import { triggerFlag } from 'redux/flags';
import { useFlag } from 'core/hooks/state';
import { incCounter } from 'redux/counters';
import "./style.scss"

const ActionsTab = () => {

    const AutoBreathe = useFlag(Flags.AutoBreathe);
    const AutoBreatheUnlocked = useFlag(Flags.AutoBreatheUnlocked);

    const dispatch = useDispatch();

    const handleBreath = () => {
        dispatch(changeStat(Status.Oxygen,10));
        if( !AutoBreatheUnlocked ){
            dispatch(incCounter(Counters.Breaths));
        }
    }

    const toggleAutoBreath = () => {
        dispatch(triggerFlag(Flags.AutoBreathe))
    }

    const root = getClassName({ base: "actions-tab" });

    return <div className={root}>
        <Button onClick={handleBreath} loadingTime={2} >Deep Breath</Button>
        {AutoBreatheUnlocked && 
            <div>
            <input 
                type="checkbox" 
                checked={AutoBreathe}
                onChange={toggleAutoBreath}
                id="AutoBreathe"
                name="AutoBreathe"
            ></input>
            <label htmlFor="AutoBreathe">Auto Breathe</label>
            </div>
        }
    </div>
}

export default ActionsTab;