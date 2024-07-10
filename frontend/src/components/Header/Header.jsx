import '../../scss/Header.scss';

function Header({ route, left, mid, right, userLogout }) {
  const handleLogout = () => {
    userLogout();
  };
  // console.log({ route });

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
