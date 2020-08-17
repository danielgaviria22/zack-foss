import { mapTo, debounceTime } from 'rxjs/operators'
import { ofType } from "redux-observable";
import { triggerSave } from 'redux/save';
import { RESOURCE } from './'

export const resourceEpic = (action$) => action$.pipe(
    ofType(RESOURCE),
    debounceTime(500),
    mapTo(triggerSave())
)