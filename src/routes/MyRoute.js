import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }) {
  console.log(useSelector(state => state.persistedReducer.auth.isLoggedin));
        const isLogedIn =  useSelector(state => state.persistedReducer.auth.isLoggedin);

        return isLogedIn ? children : <Navigate to='/login'  />;
}

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,

}
