import { useEffect, useRef, useState, useContext } from 'react';
// import { LoginContext } from '../context/LoginContext';

function Header({ loginData }) {
  const handleLogout = () => {};

  //   const { loginData, setLoginData } = useContext(LoginContext);
  return (
    <header>
      <p>user: {loginData !== null ? loginData.username : 'bitte einloggen'}</p>
      <button onClick={handleLogout}>logout</button>
    </header>
  );
}

export default Header;
