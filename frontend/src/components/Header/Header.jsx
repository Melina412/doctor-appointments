import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import '../../scss/Header.scss';

function Header({
  route,
  left,
  mid,
  right,
  loginData,
  userLogout,
  login,
  Link,
}) {
  const handleLogout = () => {
    userLogout();
  };
  // console.log({ route });
  // console.log('username', loginData?.username);

  // login/logout soll am ende über ein icon möglich sein
  return (
    <>
      {route !== 'Doctors' && (
        <header>
          <div className='header-flex'>
            <div className='left'>{left}</div>
            <div className='mid'>{mid}</div>
            <div className='right'>{right}</div>
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
