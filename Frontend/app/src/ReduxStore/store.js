import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userSlice from '../features/userSlice'





// this is the root reducer that's wraps all the other reducer 
const rootreducer = combineReducers({
    user:userSlice,
})

export const store = configureStore({

    reducer:rootreducer,
    devTools:true,
})