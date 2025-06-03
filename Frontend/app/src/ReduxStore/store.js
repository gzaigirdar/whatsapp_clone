import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userSlice from '../features/userSlice'
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// creating redux persist to keep some store data saved in local storage
const persistConfig = {
    key:"user",
    storage
}


// this is the root reducer that's wraps all the other reducer 
const rootreducer = combineReducers({
    user:userSlice,
})
// persist reducers will wrap root reducers and add persistance behavior to it
const persistedReducer = persistReducer(persistConfig,rootreducer);
export const store = configureStore({

    reducer:persistedReducer,
    // only for dev mode to get more information 
    devTools:true,
})