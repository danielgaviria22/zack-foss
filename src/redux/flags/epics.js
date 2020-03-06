import { mapTo } from "rxjs/operators"
import { ofType } from "redux-observable";
import { TRIGGER_FLAG } from ".";
import { triggerSave } from "../save";

export const flagEpic = action$ => action$.pipe(
    ofType(TRIGGER_FLAG),
    mapTo(triggerSave())
)