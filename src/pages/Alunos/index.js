import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserCircle, FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa';
import { get } from 'lodash';
import { Container } from '../../styles/globalstyles';
import axios from '../../services/axios';
import { AlunoContainer, ProfilePicture, NovoAluno } from './styled';
import Loading from '../../components/Loading';


export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDeleteAsk = e => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id) => {
    try {
      await axios.delete(`/alunos/${id}`);
      e.target.parentElement.remove();
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      errors.map(error => toast.error(error));
    }
  }

  return (
    <Container>

      <Loading isLoading={isLoading} />

      <h1>Alunos</h1>

      <NovoAluno to="/aluno/">Novo Aluno</NovoAluno>

     <AlunoContainer>
     {alunos.map(aluno => (
       <div key={String(aluno.id)}>
          {get(aluno, 'Fotos[0].url', false ) ? (
            <ProfilePicture>
              <img src={`http://${  aluno.Fotos[0].url}`} alt="" />
            </ProfilePicture>
          ) : (
            <FaUserCircle size={36} />
          )}
        <span>{aluno.nome}</span>
        <span>{aluno.email}</span>

        <Link to={`/aluno/${aluno.id}/edit`} ><FaEdit size={16} /></Link>
        <Link to={`/aluno/${aluno.id}/delete`} onClick={handleDeleteAsk} ><FaWindowClose size={16} /></Link>
          <FaExclamation
          size={16}
           display="none"
            cursor="pointer"
            onClick={e => handleDelete(e, aluno.id)}
            />
       </div>
     ))}
     </AlunoContainer>
    </ Container>
  );
}
