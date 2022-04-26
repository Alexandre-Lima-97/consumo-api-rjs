import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducers = persistReducer(
    {
      key: 'NOME-APLICACAO',
      storage,
      whitelist: ['example']
    },
    reducers
  );

  return persistedReducers;
}
