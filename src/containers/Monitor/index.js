import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { prop } from 'ramda';
import { useFlag } from 'core/hooks/state';
import { Flags } from 'core/constants';
import { useTranslation } from 'react-i18next';
import { addFixedLine } from 'redux/actionLog';
import { triggerFlag } from 'redux/flags';

const Monitor = () => {
    const dispatch = useDispatch();
    const ready = useSelector(prop("ready"))
    const hasStarted = useFlag(Flags.Started);
    const { t } = useTranslation("location")
    
    useEffect(() => {
        if(ready && !hasStarted){
            dispatch(triggerFlag(Flags.Started))
            dispatch(addFixedLine(t("startingPoint.startStory")));
        }
    },[dispatch,t,ready,hasStarted])

    return <></>
}

export default Monitor