import { ofType } from "redux-observable";
import { map, filter } from 'rxjs/operators'
import { CHANGE_LOCATION } from ".";
import { Locations } from "core/constants";
import { Maybe } from "@juan-utils/ramda-structures";
import { addTemporalLine } from "redux/actionLog";
import i18n from "../../i18n";

const getMessage = (loc) => {
    switch(loc){
        case Locations.City:
            const msgIdx = Math.floor(Math.random() * 3)
            const msg = i18n.t(`location:city.arrivalRandomPrompts.${msgIdx}`)
            return Maybe.from(addTemporalLine(msg))
        default:
            return Maybe.None();
    }
}

export const travelEpic = action$ => action$.pipe(
    ofType( CHANGE_LOCATION ),
    map(action => getMessage(action.payload)),
    filter(acts => acts.onNone(false)),
    map(act => act.get())
)