import { map, withLatestFrom, debounceTime } from 'rxjs/operators'
import { ofType } from "redux-observable";
import { SAVE, communicateSaved } from '.';
import Storage from 'core/middleware/storage';
import { TRIGGER_FLAG } from 'redux/flags';
import { TRIGGER_STATUS_EFFECT, CHANGE_STATUS_STATS, CHANGE_INVENTORY } from 'redux/status';
import { ADD_LINE } from 'redux/actionLog';
import { nth, compose, evolve, filter, takeLast } from "ramda"

const prepareState = compose((state) => {
    return evolve({
        actionLog: (msgs) => takeLast(20)(filter(x => !x.temporal,msgs))
    })(state)
}, nth(1))

export const saveEpic = (action$, state$) => action$.pipe(
    ofType(
        SAVE,
        TRIGGER_FLAG,
        CHANGE_STATUS_STATS,
        TRIGGER_STATUS_EFFECT,
        CHANGE_INVENTORY,
        ADD_LINE,
    ),
    debounceTime(200),
    withLatestFrom(state$),
    map(prepareState),
    map(state => {
        Storage.save(state)
        return communicateSaved()
    })
)