import { combineReducers } from 'redux';

import authReducer from './auth/state';
import registerReducer from './register/state';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
});
