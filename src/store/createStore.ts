import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage'; //use async storage instead of storage provided by redux-persist as it's deprecated
// @ts-ignore
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import makeRootReducer from './reducers';

//Create LOGGER that is added as a middleware (log Actions and Global state changes)
const log = createLogger({diff: true, collapsed: true});

export default (initialState: undefined = undefined) => {

    const persistConfig = {
        key: 'root', //define key for stored state as 'root'
        storage: AsyncStorage, //pass AsyncStorage as a default storage for our global state
        blacklist: [
            'createUser',
        ]
    }

    //Here is middleware that wraps log and thunk
    const middleware = [thunk, log];

    //Assign root reducer with persistConfig
    const pReducer = persistReducer(
        persistConfig,
        makeRootReducer() //Root reducers that wraps all application reducers
    );

    //Here is the created store, createStore combine root reducer, initialState, and middleware added before
    const store = createStore(
        pReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
        )
    );

    //Pass created store variable to persist store
    const persistor = persistStore(
        store
    );

    return { store, persistor }
}