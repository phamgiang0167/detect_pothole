import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createStore } from 'redux'
import { reducer } from './reducer';
import { reducerA } from './cred'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({
    reducer:reducer,
    reducerA:reducerA
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["reducerA"]
   
  };


  const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer:persistedReducer
 });

 export const persistedStore = persistStore(store)
 




