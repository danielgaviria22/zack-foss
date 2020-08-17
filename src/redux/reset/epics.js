import { ofType } from "redux-observable";
import { mergeMap } from 'rxjs/operators'
import { resetResources } from "redux/resources";
import { resetFlags } from "redux/flags";
import { triggerSave } from "redux/save";
import { resetEffects, resetStats, emptyInventory } from "redux/status";
import { fromActions } from "core/utils/redux-utils";
import { RESET } from ".";
import { resetLog } from "redux/actionLog";

export const resetEpic = action$ => action$.pipe(
    ofType(RESET),
    mergeMap(fromActions(
        resetResources,
        resetFlags,
        resetStats,
        resetEffects,
        resetLog,
        emptyInventory,
        triggerSave
    ))
)