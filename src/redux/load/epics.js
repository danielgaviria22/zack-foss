import { mergeMap , map, filter } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { compose, always } from 'ramda'
import { loadResources } from 'redux/resources'
import { loadFlags } from 'redux/flags'
import { loadEffects, loadStats, loadInventory } from 'redux/status'
import { communicateSaved } from 'redux/save'
import { fromActions } from 'core/utils/redux-utils'
import Storage from 'core/middleware/storage'
import { dotPathOr, dotPathOrFrom } from 'core/utils/functions'
import { loadLog } from 'redux/actionLog'
import { LOAD, INJECT, loadState, injectionError, loaded } from '.'
import { initialState } from 'initialState'
import { loadCounters } from 'redux/counters'
import Session from 'core/middleware/session'
import { makeMain, makeSecondary } from 'redux/main'
import { stopTimer, startTimer } from 'redux/timer'
import { loadLocation } from 'redux/location'
import { loadCooldowns } from 'redux/cooldowns'

const pathOrEmptyObject = dotPathOr({})
const pathOrEmptyArray = dotPathOr([])
const pathOrInitialStatePath = dotPathOrFrom(initialState)
const getResources = pathOrEmptyObject("resources")
const getFlags = pathOrEmptyObject("flags")
const getStats = pathOrInitialStatePath("character.stats")
const getEffects = pathOrEmptyObject("character.effects")
const getInventory = pathOrEmptyArray("character.inventory")
const getActionLog = pathOrEmptyArray("actionLog")
const getCounters = pathOrEmptyObject("counters")
const getLocation = pathOrInitialStatePath("location")
const getCooldowns = pathOrEmptyArray("cooldowns")

/**
 * Load state from localStorage
 */
export const loadEpic = action$ => action$.pipe(
    ofType(LOAD),
    map(() => Session().register(
        (store,skip) => {
            store.dispatch(makeMain())
            !skip && store.dispatch(loadState())
            store.dispatch(startTimer())
        },
        store => {
            store.dispatch(makeSecondary())
            store.dispatch(stopTimer())
        }
    )),
    filter(() => Session().isMain() ),
    map(() => Storage.load().onErr(always({}))),
    mergeMap(
        fromActions(
            compose( loadFlags     , getFlags     ),
            compose( loadResources , getResources ),
            compose( loadStats     , getStats     ),
            compose( loadEffects   , getEffects   ),
            compose( loadInventory , getInventory ),
            compose( loadLog       , getActionLog ),
            compose( loadCounters  , getCounters  ),
            compose( loadLocation  , getLocation  ),
            compose( loadCooldowns , getCooldowns ),
            loaded
        )
    )
)

/**
 * Loading state from user input. Not in use.
 */
export const injectEpic = action$ => action$.pipe(
    ofType(INJECT),
    mergeMap(act => Storage.inject(act.payload)
        .map(fromActions(loadState,communicateSaved))
        .onErr(fromActions(injectionError))
    )
)