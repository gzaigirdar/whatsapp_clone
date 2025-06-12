import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userSlice from '../features/userSlice'
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createFilter from 'redux-persist-transform-filter';


// using filter to only save certain values from a slice, not all

const UserFilter = createFilter('user',['user'])



// creating redux persist to keep some store data saved in local storage
const persistConfig = {
    key:"user",
    storage,
    // with whitelist you can filter out which slice's data to keep
    whitelist:['user'],
    // passing in the filer
    transforms:[UserFilter]
}


// this is the root reducer that's wraps all the other reducer 
const rootreducer = combineReducers({
    user:userSlice,
})
// persist reducers will wrap root reducers and add persistance behavior to it
const persistedReducer = persistReducer(persistConfig,rootreducer);
export const store = configureStore({

    reducer:persistedReducer,
    // default middleware doesn't need to be imported, as it passed automically to the function 
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,

        }
        ),
    
    // only for dev mode to get more information 
    devTools:true,
})
export const PersistStore = persistStore(store)