import { createEpicMiddleware } from 'redux-observable'
import { createStore, applyMiddleware, compose } from 'redux'

import { rootEpic } from './epic'
import { rootReducer } from './reducer'

const epicMiddleware = createEpicMiddleware()

const initialState = {
    resources: {},
    flags: {},
    character: {
        effects: {},
        stats: {},
        inventory: []
    }
}

const initStore = () => {
    const composeEnhancers = 
        process.env.NODE_ENV === "development" ? 
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

export default initStore