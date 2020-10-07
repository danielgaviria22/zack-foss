import React from 'react'
import { Maybe } from 'jazzi';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeStat } from 'redux/status';
import ActionButton from 'components/ActionButton';
import getClassName from "getclassname"
import { Status, Flags, Counters, Locations, Items, Actions } from 'core/constants';
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
        <ActionButton 
            action={Actions.Breathe} 
            onClick={handleBreath}
        >Breathe</ActionButton>
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
                    return <ActionButton 
                        action={Actions.Travel}
                        cooldown={3}
                        key={context} 
                        onClick={handleTravel(context)} shy compact>{t("goTo",{ context })}</ActionButton>
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
        dispatch(changeStat(Status.Stamina,10))
        dispatch(changeStat(Status.Water,-10))
        dispatch(addTemporalLine(t("city.actions.gym.message")))
    }
    
    const handleWork = () => {
        inventory.changeAmount(Items.GP,100);
        dispatch(changeStat(Status.Stamina,-10))
        dispatch(addTemporalLine(t("city.actions.work.message")))
    }

    return <>
        <ActionButton action={Actions.Gym} onClick={handleGym} cooldown={8} shy compact>{t("city.actions.gym.option")}</ActionButton>
        <ActionButton action={Actions.Gym} onClick={handleWork} shy compact>{t("city.actions.work.option")}</ActionButton>
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