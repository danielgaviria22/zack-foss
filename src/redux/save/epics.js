import { ofType } from "redux-observable";
import { map, withLatestFrom, debounceTime, filter as filterActions } from 'rxjs/operators'
import { nth, compose, evolve, filter, takeLast, toPairs, fromPairs, omit } from "ramda"
import Storage from 'core/middleware/storage';
import { TRIGGER_FLAG } from 'redux/flags';
import { TRIGGER_STATUS_EFFECT, CHANGE_STATUS_STATS, CHANGE_INVENTORY, CHANGE_STATUS_EFFECT } from 'redux/status';
import { ADD_LINE } from 'redux/actionLog';
import { SAVE, communicateSaved } from '.';
import { SET_COUNTER, DEC_COUNTER, INC_COUNTER } from "redux/counters";
import { CHANGE_LOCATION } from "redux/location";
import { REDUCE_COOLDOWN, SET_COOLDOWN } from "redux/cooldowns";

const removeFalsyProps = compose(fromPairs, filter(nth(1)) ,toPairs)

const prepareState = compose(
    omit(["ready"]),
    (state) => evolve({
        actionLog: (msgs) => takeLast(20)(filter(x => !x.temporal,msgs)),
        counters: removeFalsyProps,
        character: {
            effects: removeFalsyProps
        },
    })(state), 
    nth(1)
)

export const saveEpic = (action$, state$) => action$.pipe(
    ofType(
        SAVE,
        TRIGGER_FLAG,
        CHANGE_STATUS_STATS,
        TRIGGER_STATUS_EFFECT,
        CHANGE_STATUS_EFFECT,
        CHANGE_INVENTORY,
        SET_COUNTER, DEC_COUNTER, INC_COUNTER,
        ADD_LINE,
        CHANGE_LOCATION,
        SET_COOLDOWN, REDUCE_COOLDOWN
    ),
    filterActions(action => {
        if( action.type === ADD_LINE){
            return !action.payload.temporal
        } 
        return true
    }),
    debounceTime(200),
    withLatestFrom(state$),
    map(prepareState),
    map(state => {
        Storage.save(state)
        return communicateSaved()
    })
)