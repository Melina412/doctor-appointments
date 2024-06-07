import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import '../../scss/Header.scss';

function Header({ left, mid, right, loginData, userLogout, login }) {
  const handleLogout = () => {
    userLogout();
  };
  // console.log({ route });
  console.log('username', loginData?.username);

  return (
    <header>
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

      <div className={`header-flex ${right === null && 'hidden'}`}>
        <div className='left'>{left}</div>
        <div className='mid'>{mid}</div>
        <div className='right'>{right}</div>
      </div>
    </header>
  );
}

export default Header;
