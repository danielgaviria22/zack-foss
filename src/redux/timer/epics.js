import { juxt } from "ramda"
import { ofType } from "redux-observable";
import { map, mergeMap, withLatestFrom } from 'rxjs/operators'
import { fromActionsEager } from 'core/utils/redux-utils';
import Timer from "core/structures/timer";
import { 
    START_TIMER, STOP_TIMER, 
    TICK, tick, ticked, 
    startedTimer, stopped
} from ".";

export const timerEpic = (action$) => action$.pipe(
    ofType(
        START_TIMER,
        STOP_TIMER
    ),
    map((action) => {
        if( action.type === START_TIMER ){
            Timer().interval((store) => {
                store.dispatch(tick())
            })
            return startedTimer();
        } else {
            Timer().stopInterval();
            return stopped()
        }
    })
)

const processTick = []

export const tickEpic = (action$,state$) => action$.pipe(
    ofType(TICK),
    withLatestFrom(state$),
    mergeMap(([,state]) => {
        return fromActionsEager(
            ...juxt(processTick)(state),
            ticked
        )
    })
)