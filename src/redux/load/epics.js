import { of } from 'rxjs'
import { mergeMap , map } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { defaultTo , prop , compose } from 'ramda'
import { LOAD } from '.'
import { loadResources } from '../resources'
import Storage from '../../utils/storage'

const propOrEmptyObject = name => compose( defaultTo({}), prop(name))
const resources = propOrEmptyObject("resources")

export const loadEpic = action$ => action$.pipe(
    ofType(LOAD),
    map(Storage.load),
    mergeMap((state) => of(
        loadResources(resources(state))
    ))
)