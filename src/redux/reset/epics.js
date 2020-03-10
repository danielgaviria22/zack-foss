import { ofType } from "redux-observable";
import { mergeMap } from 'rxjs/operators'
import { RESET } from ".";
import { resetResources } from "redux/resources";
import { resetFlags } from "redux/flags";
import { triggerSave } from "redux/save";
import { fromActions } from "core/utils/redux-utils";

export const resetEpic = action$ => action$.pipe(
    ofType(RESET),
    mergeMap(fromActions(
        resetResources,
        resetFlags,
        triggerSave
    ))
)