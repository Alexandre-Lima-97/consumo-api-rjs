import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';
import { loginFailure, loginSuccess } from './state';
import * as actions from '../types';



function* workLogin({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(loginSuccess( {...response.data}));

    toast.success("DEU CERTO");

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    payload.navigate(-2);
  } catch(e) {
    toast.error('Usuario ou senha inválidos');
    yield put(loginFailure())
  }
}

function persistRehydrate({ payload}) {
  const token = get(payload, 'auth.token');
  if(!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* loginSaga() {
  yield takeLatest('auth/loginRequest', workLogin);
  yield takeLatest(actions.PERSIST_REHYDRATE, persistRehydrate)
}

export default loginSaga;
