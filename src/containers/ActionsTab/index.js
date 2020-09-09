import React from 'react'
import Button from 'components/Button';
import { getClassName } from 'core/utils/css-class'
import { useDispatch } from 'react-redux';
import { changeStat } from 'redux/status';
import { Status, Flags, Counters } from 'core/constants';
import { triggerFlag } from 'redux/flags';
import { useFlag } from 'core/hooks/state';
import { incCounter } from 'redux/counters';
import { addTemporalLine } from 'redux/actionLog';
import { useTranslation } from 'react-i18next';
import "./style.scss"

const Breathe = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation("location");
    const AutoBreathe = useFlag(Flags.AutoBreathe);
    const AutoBreatheUnlocked = useFlag(Flags.AutoBreatheUnlocked);

    const handleBreath = () => {
        dispatch(changeStat(Status.Oxygen,10));
        dispatch(addTemporalLine(t("startingPoint.clickBreatheButton")))
        dispatch(incCounter(Counters.Breaths));
    }

    const toggleAutoBreath = () => {
        dispatch(triggerFlag(Flags.AutoBreathe))
    }

    return <>
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
    </>
}

const ActionsTab = () => {
    const root = getClassName({ base: "actions-tab" });

    return <div className={root}>
        <Breathe />
    </div>
}

export default ActionsTab;