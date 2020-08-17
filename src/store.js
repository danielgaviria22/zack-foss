import { createEpicMiddleware } from 'redux-observable'
import { createStore, applyMiddleware, compose } from 'redux'

import { rootEpic } from './epic'
import { rootReducer } from './reducer'
import { initialState } from 'initialState'

const epicMiddleware = createEpicMiddleware()

const initStore = () => {
    const composeEnhancers = 
        process.env.NODE_ENV === "development" ? 
            // @ts-ignore
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : 
            compose;

    const enhancers = [
        epicMiddleware,
    ]
    
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...enhancers)
        )
    )

    epicMiddleware.run(rootEpic);

    return store;
}

const store = initStore()

export default store