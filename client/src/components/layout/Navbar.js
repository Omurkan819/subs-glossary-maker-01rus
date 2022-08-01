import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../../context/auth/AuthState';
import { useSubitems, clearSubitems } from '../../context/subitem/SubitemState';

const Navbar = ({ title, icon }) => {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated, user } = authState;

  // we just need the subitem dispatch without state.
  const subitemDispatch = useSubitems()[1];

  const onLogout = () => {
    logout(authDispatch);
    clearSubitems(subitemDispatch);
  };

  const authLinks = (
    <Fragment>
      <li>{user && user.name} в своём кабинете&nbsp;&nbsp;&nbsp;</li>
      <li>
        <Link onClick={onLogout} to='/login'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Выход</span>
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Регистрация</Link>
      </li>
      <li>
        <Link to='/login'>Вход</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/'>
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Глоссатор субтитров',
  // icon: 'fas fa-id-card-alt'
  icon: 'fas fa-closed-captioning'
};

export default Navbar;
