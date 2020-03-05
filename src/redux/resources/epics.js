import { mergeMap, map } from 'rxjs/operators'
import { ofType } from "redux-observable";
import { RESOURCE } from './'
import Storage from '../../utils/storage';

export const resourceEpic = ($action,$state) => $action.pipe(
    ofType(RESOURCE),
    mergeMap(() => $state.pipe(
        map((data) => Storage.save(data)))
    )
)