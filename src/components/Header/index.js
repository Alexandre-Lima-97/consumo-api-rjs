import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, Navigate } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaUserAlt, FaCircle, FaPowerOff } from 'react-icons/fa';
import { Nav } from './styled';
import * as actions from '../../store/modules/auth/state';

export default function Header() {
  const isLoggedIn = useSelector(state => state.persistedReducer.auth.isLoggedin);
  const dispatch = useDispatch();

  const handleClick = e => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    <Navigate to='/login'  />;

  }

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>
      {isLoggedIn ?
       (  <Link onClick={handleClick} to="/logout">
         <FaPowerOff size={24} />
       </Link>

        ) :
       ( <Link to="/login">
        <FaSignInAlt size={24} />
      </Link> )}


      {isLoggedIn && <FaCircle size={24} color="#66ff33" />}

    </Nav>
  );
}
