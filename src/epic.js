import { combineEpics } from 'redux-observable'
import { saveEpic } from './redux/save/epics'
import { loadEpic, injectEpic } from './redux/load/epics'
import { resourceEpic } from './redux/resources/epics'
import { flagEpic } from './redux/flags/epics'
import { resetEpic } from './redux/reset/epics'

export const rootEpic = combineEpics(
    resourceEpic,
    loadEpic,
    saveEpic,
    flagEpic,
    resetEpic,
    injectEpic
);