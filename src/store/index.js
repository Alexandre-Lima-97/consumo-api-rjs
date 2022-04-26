import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';

// import persistedReducers from './modules/reduxPersist';

import rootReducer from './modules/rootReducer';
// import rootSaga from './modules/rootSaga';

// const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {rootReducer},


  });

// sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
