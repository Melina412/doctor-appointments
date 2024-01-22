import { useEffect, useRef, useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { LoginContext } from '../context/LoginContext';
import '../scss/Header.scss';

function Header({ loginData, logout, login }) {
  const handleLogout = () => {
    logout();
  };

  // const { loginData, setLoginData } = useContext(LoginContext);
  return (
    <header>
      <nav>
        <NavLink to='/'>HOME</NavLink>
        <NavLink to='/doctors'>DOCTORS</NavLink>
        <NavLink to='/login'>LOGIN</NavLink>
        <NavLink to='/dashboard'>DASHBOARD</NavLink>
      </nav>

      <p>
        user: {loginData !== null ? loginData.username : 'bitte einloggen'}{' '}
        {!login && <Link to='/login'>login</Link>}
      </p>
      {login && <button onClick={handleLogout}>logout</button>}
    </header>
  );
}

export default Header;
