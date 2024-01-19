import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function Protector() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkToken() {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + '/api/auth/check',
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

  if (!authorized && !loading) {
    return <Navigate to={'/login'} />;
  }
  if (loading) {
    return (
      <main className='flex justify-center items-center h-screen'>
        <div>
          <span className='w-screen loading loading-infinity text-warning'></span>
        </div>
      </main>
    );
  }
  return <Outlet />;
}

export default Protector;
