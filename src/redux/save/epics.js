import { map, withLatestFrom, debounceTime } from 'rxjs/operators'
import { ofType } from "redux-observable";
import { SAVE, communicateSaved } from '.';
import Storage from '../../utils/storage';

export const saveEpic = (action$, state$) => action$.pipe(
    ofType(SAVE),
    debounceTime(200),
    withLatestFrom(state$),
    map(([, state]) => {
        Storage.save(state)
        return communicateSaved()
    })
)