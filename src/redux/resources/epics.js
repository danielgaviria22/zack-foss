import { mapTo, debounceTime } from 'rxjs/operators'
import { ofType } from "redux-observable";
import { RESOURCE } from './'
import { triggerSave } from 'redux/save';

export const resourceEpic = (action$) => action$.pipe(
    ofType(RESOURCE),
    debounceTime(500),
    mapTo(triggerSave())
)