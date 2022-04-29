import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
  import createSagaMiddleware from 'redux-saga';
  import storage from 'redux-persist/lib/storage'

import rootReducer from './modules/rootReducer';
import authSaga from './modules/auth/saga';
import registerSaga from './modules/register/saga';
import authReducer from './modules/auth/state';
import registerReducer from './modules/register/state';

const persistConfig = {
  key: 'CONSUMO-API',
  version: 1,
  storage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    persistedReducer,
    auth: authReducer,
    register: registerReducer},
  middleware: [saga]
});
saga.run(authSaga);
saga.run(registerSaga);

export const persistor = persistStore(store);
export default store;


/*
(getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    */
