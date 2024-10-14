import { legacy_createStore as createStore } from 'redux'
import userReducer from './userReducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
