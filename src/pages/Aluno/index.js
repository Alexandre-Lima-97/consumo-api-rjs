import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux';

import { get } from 'lodash';
import { isEmail, isInt, isFloat} from 'validator';
import { Container, } from '../../styles/globalstyles';
import { Form, ProfilePicture } from './styled';
import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/state';

export default function Aluno() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [nome, setNome] = React.useState('');
  const [sobrenome, setSobrenome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [idade, setIdade] = React.useState('');
  const [peso, setPeso] = React.useState('');
  const [altura, setAltura] = React.useState('');

  React.useEffect(() => {
    if (!id) return;

    async function getData() {
      try{
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');

        setNome(data.nome);
        setEmail(data.email);
        setSobrenome(data.sobrenome);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
      } catch(err) {
        const status = get(err, 'response.status', 0);
        const erros = get(err, 'response.data.errors', []);

        if(status === 400 ){
          erros.map(error => toast.error(error));
          <Navigate to ='/' />
        }
      }
    }
    getData();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    let formErrors = false;
    if(nome.length < 3 || nome.length > 255){
      formErrors = true;
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
    }
    if(sobrenome.length < 3 || sobrenome.length > 255){
      formErrors = true;
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
    }
    if(!isEmail(email)){
      formErrors = true;
      toast.error('Email inválido');
    }

    if(!isInt(String(idade))) {
      toast.error('Idade inválida');
      formErrors = true;
    }

    if(!isFloat(String(peso))) {
      toast.error('Peso inválido');
      formErrors = true;
    }

    if(!isFloat(String(altura))) {
      toast.error('Altura inválido');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      if(id) {
        await axios.put(`/alunos/${id}`, {
          nome, sobrenome, email, idade, peso, altura
        });
        toast.success('Aluno editado com sucesso');
      } else{
        await axios.post(`/alunos/`, {
          nome, sobrenome, email, idade, peso, altura
        });
        toast.success('Aluno criado com sucesso');
      }
    } catch(err) {
      const status = get(err, 'response.status', 0);
      // const data = get(err, 'response.data', 0);
      const errors = get(err, 'errors', 0);

      if (errors.length > 0) {
        errors.map(error => toast.error(error));
      } else{
        toast.error('Erro Desconhecido');
      }

      if(status===401) dispatch(actions.loginFailure());
    }

  }

  return (
    <Container>
      <h1>{id ? 'Editar Aluno' : 'Novo Aluno'}</h1>

      <ProfilePicture>

      </ProfilePicture>

    <Form onSubmit={handleSubmit}>
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
        <input type="text" value={sobrenome} onChange={e => setSobrenome(e.target.value)} placeholder="Sobrenome" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="number" value={idade} onChange={e => setIdade(e.target.value)} placeholder="Idade" />
        <input type="text" value={peso} onChange={e => setPeso(e.target.value)} placeholder="Peso" />
        <input type="text" value={altura} onChange={e => setAltura(e.target.value)} placeholder="Altura" />

        <button type="submit">Enviar</button>
    </Form>

    </ Container>
  );
}
