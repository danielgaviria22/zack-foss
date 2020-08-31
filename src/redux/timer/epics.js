import { ofType } from "redux-observable";
import { juxt } from "ramda"
import { map, mergeMap, withLatestFrom, filter } from 'rxjs/operators'
import Timer from "core/structures/timer";
import { fromActionsEager } from 'core/utils/redux-utils';
import { START_TIMER, STOP_TIMER, TICK, tick } from ".";
import { checkOxygen, checkAutoBreathUnlock } from './timerEffects'

export const timerEpic = (action$) => action$.pipe(
    ofType( START_TIMER, STOP_TIMER ),
    map((action) => {
        if( action.type === START_TIMER ){
            Timer().interval((store) => {
                store.dispatch(tick())
            })
        } else {
            Timer().stopInterval();
        }
    }),
    filter(() => false) // Do nothing
)

// Array of functions that have the following signature:
// (state) => Maybe<action[]>
// These functions should always return a Maybe of action array.
// Should return Maybe.None when no changes are required
/**
 * @template T
 * @typedef {import('@juan-utils/ramda-structures').Maybe<T>} Maybe
 */
/** 
 * @typedef {{ type: string, payload?: any}} Action
 * @typedef {(state: any) => Maybe<Action | Action[]>} ActionGenerator
 * @constant processTick
 * @type {ActionGenerator[]}
 */
const processTick = [
    checkOxygen, checkAutoBreathUnlock
]

const getActions = maybeAction => maybeAction.onNone(() => [])
const unwrapActions = arr => arr.flatMap(getActions)

export const tickEpic = (action$,state$) => action$.pipe(
    ofType(TICK),
    withLatestFrom(state$),
    map(([,state]) => unwrapActions(juxt(processTick)(state))),
    filter(actions => actions.length),
    mergeMap(actions => {
        return fromActionsEager(
            ...actions,
        )
    })
)