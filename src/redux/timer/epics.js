import { ofType } from "redux-observable";
import { juxt, isEmpty, complement, flatten } from "ramda"
import { map, mergeMap, withLatestFrom, filter } from 'rxjs/operators'
import Timer from "core/structures/timer";
import { fromActionsEager } from 'core/utils/redux-utils';
import { START_TIMER, STOP_TIMER, TICK, tick } from ".";
import { checkOxygen, checkEffects, checkAutoBreathUnlock } from './timerEffects'

const removeFalsy = arr => flatten(arr).filter(Boolean)

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
    filter(Boolean)
)

// Array of functions that have the following signature:
// (state) => action | undefined
// These functions should always return an action or undefined.
// Any resulting falsy value is filtered out but undefined should be preferred
const processTick = [
    checkOxygen, checkEffects, checkAutoBreathUnlock
]

export const tickEpic = (action$,state$) => action$.pipe(
    ofType(TICK),
    withLatestFrom(state$),
    map(([,state]) => removeFalsy(juxt(processTick)(state))),
    filter(complement(isEmpty)),
    mergeMap(actions => {
        return fromActionsEager(
            ...actions,
        )
    })
)