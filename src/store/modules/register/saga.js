import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';
import { registerFailure, registerSuccess } from './state';
// import { loginSuccess } from '../auth/state';



function* workRegister ({ payload }) {
  const { id, nome, email, password } = payload;

  try {
    if(id) {
      yield call(axios.put, '/users/' ,{
        email,
        nome,
        password: password || undefined
      });
      toast.success('Conta alterada com sucesso');
      yield put(registerSuccess(payload));
    } else {
      yield call(axios.post, '/users/' ,{
        email,
        nome,
        password
      });
      toast.success('Conta criada com sucesso');
      payload.navigate('/login');
    }
  } catch (e) {
    const errors = get(e, 'response.data.error', []);
    // const status = get(e, 'response.status', 0);

    if(errors.length > 0) {
      errors.map(error => toast.error(error))
    } else {
      toast.error('Erro desconhecido');

    }
    yield put(registerFailure());
  }
}

function* registerSaga() {
  yield takeLatest('register/registerRequest', workRegister);
}

export default registerSaga;
