import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import '../../scss/Header.scss';

function Header({ left, mid, right, loginData, userLogout, login, Link }) {
  const handleLogout = () => {
    userLogout();
  };
  // console.log({ route });
  // console.log('username', loginData?.username);

  // login/logout soll am ende über ein icon möglich sein
  return (
    <header>
      {/* dieser Teil kommt am Ende raus! xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
      <div className='demo-header'>
        <nav>
          <NavLink to='/'>HOME</NavLink>
          <NavLink
            to='/doctors'
            onClick={() => sessionStorage.setItem('doctorSpecialty', 'all')}>
            DOCTORS
          </NavLink>
          <NavLink to='/login'>LOGIN</NavLink>
          <NavLink to='/dashboard'>DASHBOARD</NavLink>
        </nav>

        <p>
          user: {loginData !== null ? loginData?.username : 'bitte einloggen'}{' '}
          {!login && <Link to='/login'>login</Link>}
        </p>
        {login && <button onClick={handleLogout}>logout</button>}
        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
      </div>
      <div className={`header-flex ${right === null && 'hidden'}`}>
        <div className='left'>{left}</div>
        <div className='mid'>{mid}</div>
        <div className='right'>{right}</div>
      </div>
    </header>
  );
}

export default Header;
