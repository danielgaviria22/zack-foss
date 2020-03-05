import { resourceEpic } from './redux/resources/epics'
import { combineEpics } from 'redux-observable'

export const rootEpic = combineEpics(resourceEpic);