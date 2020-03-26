import { map, withLatestFrom, debounceTime } from 'rxjs/operators'
import { ofType } from "redux-observable";
import { SAVE, communicateSaved } from '.';
import Storage from 'core/middleware/storage';
import { TRIGGER_FLAG } from 'redux/flags';
import { TRIGGER_STATUS_EFFECT, CHANGE_STATUS_STATS, CHANGE_INVENTORY } from 'redux/status';

export const saveEpic = (action$, state$) => action$.pipe(
    ofType(
        SAVE,
        TRIGGER_FLAG,
        CHANGE_STATUS_STATS,
        TRIGGER_STATUS_EFFECT,
        CHANGE_INVENTORY
    ),
    debounceTime(200),
    withLatestFrom(state$),
    map(([, state]) => {
        Storage.save(state)
        return communicateSaved()
    })
)