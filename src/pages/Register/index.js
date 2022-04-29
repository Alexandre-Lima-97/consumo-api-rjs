
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '../../styles/globalstyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/register/state';


export default function Register() {
  const id = useSelector(state => state.persistedReducer.auth.user.id);
  const nomeStored = useSelector(state => state.persistedReducer.auth.user.nome);
  const emailStored = useSelector(state => state.persistedReducer.auth.user.email);
  const isLoading = useSelector(state => state.persistedReducer.auth.user.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() =>{
    if(!id) return;

    setNome(nomeStored);
    setEmail(emailStored);
  }, [emailStored, id, nomeStored]);

  async function handleSubmit(e) {

    e.preventDefault();

    let formErrors = false;

    if(nome.length < 2 || nome.length > 255) {
      formErrors = true;
      toast.error("Nome deve ter entre 2 e 255 caracteres");
    }
    if(!isEmail(email)) {
      formErrors = true;
      toast.error("Email inválido");
    }

    if(!id && (password.length < 6 || password.length > 255)) {
      formErrors = true;
      toast.error("Senha deve ter entre 6 e 50 caracteres");
    }

    if(formErrors) return;

    dispatch(actions.registerRequest({ nome, email, password, id, navigate}));
  }

  return (
    <Container>

  <Loading isLoading={isLoading} />

      <h1>{id ? 'Editar Dados' : 'Crie sua conta'}</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor='nome'>
            Nome:
            <input type="text" value={nome} placeholder="Seu Nome" onChange={e => setNome(e.target.value)} />
          </label>
          <label htmlFor='email'>
            Email:
          <input type="email" value={email} placeholder="Seu Email" onChange={e => setEmail(e.target.value)} />
          </label>
          <label htmlFor='password'>
            Senha:
          <input type="password" value={password} placeholder="Sua Senha" onChange={e => setPassword(e.target.value)} />
        </label>

        <button type='submit'>Salvar</button>
      </Form>
    </ Container>
  );
}
