import React from 'react'
import { Maybe } from '@juan-utils/ramda-structures';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeStat } from 'redux/status';
import Button from 'components/Button';
import { getClassName } from 'core/utils/css-class'
import { Status, Flags, Counters, Locations, Items } from 'core/constants';
import { triggerFlag } from 'redux/flags';
import { useFlag, useLocation, useInventory } from 'core/hooks/state';
import { incCounter } from 'redux/counters';
import { addTemporalLine } from 'redux/actionLog';
import { changeLocation } from 'redux/location';
import "./style.scss"

const Breathe = () => {
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
        <Button onClick={handleBreath} loadingTime={2} >Breathe</Button>
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

const getTravelOptions = (location) => {
    switch(location){
        case Locations.Home:
            return Maybe.Just([ Locations.City, Locations.Forest ])
        case Locations.Forest:
        case Locations.City:
            return Maybe.Just([ Locations.Home ])
        default:
            return Maybe.None()
    }
}

const Travel = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation("location");
    const location = useLocation()
    const unlocked = useFlag(Flags.TravelUnlocked);

    const handleTravel = to => () => {
        dispatch(changeLocation(to))
    }

    return <>
        {
            getTravelOptions(location)
            .chain(locs => Maybe.fromPredicate(() => unlocked,locs))
            .map((locs) => 
                locs.map((context) => {
                    return <Button key={context} onClick={handleTravel(context)} shy compact>{t("goTo",{ context })}</Button>
                })
            )
            .onNone(<></>)
        }
    </>
}

const City = () => {
    const dispatch = useDispatch();
    const inventory = useInventory();
    const { t } = useTranslation("location");

    const handleGym = () => {
        dispatch(addTemporalLine(t("city.actions.gym.message")))
    }
    
    const handleWork = () => {
        inventory.changeAmount(Items.GP,100);
        dispatch(changeStat(Status.Stamina,-10))
        dispatch(addTemporalLine(t("city.actions.work.message")))
    }

    return <>
        <Button onClick={handleGym}  shy compact>{t("city.actions.gym.option")}</Button>
        <Button onClick={handleWork} shy compact>{t("city.actions.work.option")}</Button>
    </>
}

const ActionsTab = () => {
    const location = useLocation()

    const root = getClassName({ base: "actions-tab" });

    return <div className={root}>
        <Breathe />
        <Travel />
        {location === Locations.City && <City />}
    </div>
}

export default ActionsTab;