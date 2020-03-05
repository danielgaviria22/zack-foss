import { saveEpic } from './redux/save/epics'
import { loadEpic } from './redux/load/epics'
import { resourceEpic } from './redux/resources/epics'
import { combineEpics } from 'redux-observable'

export const rootEpic = combineEpics(
    resourceEpic,
    loadEpic,
    saveEpic
);