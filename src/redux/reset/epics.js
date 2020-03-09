import { ofType } from "redux-observable";
import { mergeMap } from 'rxjs/operators'
import { RESET } from ".";
import { resetResources } from "../resources";
import { resetFlags } from "../flags";
import { triggerSave } from "../save";
import { fromActions } from "../../utils/redux-utils";

export const resetEpic = action$ => action$.pipe(
    ofType(RESET),
    mergeMap(fromActions(
        resetResources,
        resetFlags,
        triggerSave
    ))
)