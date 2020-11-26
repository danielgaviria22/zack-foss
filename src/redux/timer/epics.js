import { ofType } from "redux-observable";
import { map, mergeMap, withLatestFrom, filter } from 'rxjs/operators'
import Timer from "core/structures/timer";
import { fromActionsEager } from 'core/utils/redux-utils';
import { START_TIMER, STOP_TIMER, TICK, tick } from ".";
import processTick from './timerEffects'

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

export const tickEpic = (action$,state$) => action$.pipe(
    ofType(TICK),
    withLatestFrom(state$),
    map(([,state]) => processTick.run(state)),
    filter(actions => actions.length),
    mergeMap(actions => {
        return fromActionsEager(
            ...actions,
        )
    })
)