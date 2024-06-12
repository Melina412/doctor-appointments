import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { LoginContext } from './context/LoginContext';

function Protector({ setLogin }) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // const { loginData, setLoginData } = useContext(LoginContext);
  // console.log({ authorized });
  // console.log({ loading });

  //$ refreshToken() ---------------------------------------------------

  async function refreshToken() {
    console.log('attempting to refresh token...');

    const response = await fetch(
      import.meta.env.VITE_BACKENDURL + '/api/auth/refresh',
      {
        credentials: 'include',
      }
    );
    if (response.ok) {
      console.log('✅ token refreshed successfully!');
      setAuthorized(true);
    } else {
      console.log('❌ refresh failed:', response.statusText);
      setAuthorized(false);
    }
    setLoading(false);
  }

  //$ checkToken() ----------------------------------------------------

  useEffect(() => {
    async function checkToken() {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKENDURL + '/api/auth/check',
          {
            credentials: 'include',
          }
        );

        if (!response.ok) {
          // falls check einen neg res bekommt, wird refresh direkt versucht
          console.log('access token check failed, trying to refresh...');
          await refreshToken();
        } else {
          // wenn es einen pos res gibt, wird das das expDate verglichen.
          // wenn es abgelaufen ist wird auch refresh versucht, wenn nicht ist der access token noch gültig und es geht weiter
          const exp = await response.json();
          const now = Date.now();
          const expDate = exp * 1000;
          // console.log(now);
          // console.log(expDate);
          if (exp && expDate < now) {
            console.log('access token expired, refreshing...');
            await refreshToken();
          } else {
            console.log('access token is valid');
            setAuthorized(true);
          }
        }
      } catch (error) {
        console.log('error in checkToken', error);
        setAuthorized(false);
      }
      setLoading(false);
    }
    checkToken();
  }, []);

  // -----------------------------------------------------------------------

  if (!authorized && !loading) {
    // localStorage.setItem('doctor-login', false);
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
