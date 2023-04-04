import { combineEpics } from 'redux-observable'
import { saveEpic } from 'redux/save/epics'
import { loadEpic, injectEpic } from 'redux/load/epics'
import { resourceEpic } from 'redux/resources/epics'
import { resetEpic } from 'redux/reset/epics'
import { timerEpic, tickEpic } from 'redux/timer/epics'
import { travelEpic } from 'redux/location/epics'

export const rootEpic = combineEpics(
    resourceEpic,
    loadEpic,
    saveEpic,
    resetEpic,
    injectEpic,
    timerEpic,
    tickEpic,
    travelEpic
);