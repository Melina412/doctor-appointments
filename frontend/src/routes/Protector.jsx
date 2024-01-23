import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { LoginContext } from './context/LoginContext';

function Protector() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // const { loginData, setLoginData } = useContext(LoginContext);
  // console.log({ authorized });
  // console.log({ loading });

  //$ checkToken() ----------------------------------------------------

  useEffect(() => {
    async function checkToken() {
      const response = await fetch(
        import.meta.env.VITE_BACKENDURL + '/api/auth/check',
        {
          credentials: 'include',
        }
      );
      if (response.ok) {
        setAuthorized(true);
      }
      setLoading(false);
    }
    checkToken();
  }, []);

  // -----------------------------------------------------------------------

  if (!authorized && !loading) {
    localStorage.setItem('doctor-login', false);
    return <Navigate to={'/login'} />;
  }
  if (loading) {
    return (
      <main>
        <div>
          <span>loading...</span>
        </div>
      </main>
    );
  }
  return <Outlet />;
}

export default Protector;
