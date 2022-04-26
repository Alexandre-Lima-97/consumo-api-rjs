import React from 'react';
import { Route, Routes} from 'react-router-dom';

 import PrivateRoute from './MyRoute';

import Login from '../pages/Login';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Fotos from '../pages/Fotos';
import Register from '../pages/Register';
import Page404 from '../pages/Page404';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Alunos /> } />
      <Route path="/aluno/:id/edit" element={ <PrivateRoute><Aluno /></PrivateRoute> } />
      <Route path="/aluno/" element={ <PrivateRoute><Aluno /></PrivateRoute> } />
      <Route path="/fotos/:id" element={ <PrivateRoute><Fotos /></PrivateRoute> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="*" element={  <Page404 /> } />
    </Routes>
  );
}
