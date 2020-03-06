import { mergeMap , map } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { propOr , compose, always } from 'ramda'
import { LOAD, INJECT, loadState, injectionError } from '.'
import { loadResources } from '../resources'
import { loadFlags } from '../flags'
import { communicateSaved } from '../save'
import { fromActions } from '../../utils/redux-utils'
import Storage from '../../utils/storage'

const propOrEmptyObject = propOr({})
const getResources = propOrEmptyObject("resources")
const getFlags = propOrEmptyObject("flags")

export const loadEpic = action$ => action$.pipe(
    ofType(LOAD),
    map(() => Storage.load().onError(always({}))),
    mergeMap(
        fromActions(
            compose( loadFlags, getFlags ),
            compose( loadResources, getResources )
        )
    )
)

export const injectEpic = action$ => action$.pipe(
    ofType(INJECT),
    mergeMap(act => Storage.inject(act.payload)
        .map(fromActions(loadState,communicateSaved))
        .onError(fromActions(injectionError))
    )
)