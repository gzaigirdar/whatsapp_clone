import {combineReducers, configureStore} from '@reduxjs/toolkit'

// this is the root reducer that's wraps all the other reducer 



const rootreducer = combineReducers({})

export const store = configureStore({

    reducer:rootreducer,
    devTools:true,
})