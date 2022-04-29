import React from 'react';
import { isEmail } from 'validator';
// import { get } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '../../styles/globalstyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/state';

import Loading from '../../components/Loading';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(state => state.persistedReducer.auth.isLoading);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();

    let formErrors = false;

    if(!isEmail(email)) {
      formErrors = true;
      toast.error("Email inválido");
    }

    if(password.length < 6 || password.length > 255) {
      formErrors = true;
      toast.error("Senha inválida");
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, navigate}));
  }

  return (
    <Container>

      <Loading isLoading={isLoading}/>

      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input type="text"  placeholder='Seu e-mail' value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password"  placeholder='Sua Senha' value={password} onChange={e => setPassword(e.target.value)} />
        <button type='submit'>Acessar</button>
      </Form>

    </ Container>
  );
}
