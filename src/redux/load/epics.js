import { mergeMap , map } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { compose, always, __ } from 'ramda'
import { LOAD, INJECT, loadState, injectionError } from '.'
import { loadResources } from 'redux/resources'
import { loadFlags } from 'redux/flags'
import { loadEffects, loadStats, loadInventory } from 'redux/status'
import { communicateSaved } from 'redux/save'
import { fromActions } from 'core/utils/redux-utils'
import Storage from 'core/middleware/storage'
import { dotPathOr } from 'core/utils/functions'

const pathOrEmptyObject = dotPathOr({})
const pathOrEmptyArray = dotPathOr([])
const getResources = pathOrEmptyObject("resources",__)
const getFlags = pathOrEmptyObject("flags",__)
const getStats = pathOrEmptyObject("character.stats",__)
const getEffects = pathOrEmptyObject("character.effects",__)
const getInventory = pathOrEmptyArray("character.inventory",__)

export const loadEpic = action$ => action$.pipe(
    ofType(LOAD),
    map(() => Storage.load().onError(always({}))),
    mergeMap(
        fromActions(
            compose( loadFlags, getFlags ),
            compose( loadResources, getResources ),
            compose( loadStats, getStats ),
            compose( loadEffects, getEffects ),
            compose( loadInventory, getInventory)
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