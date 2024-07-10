import { Navigate, Outlet, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getApiUrl from '../../utils/getApiUrl.js';

function ReviewProtector() {
  const API_URL = getApiUrl();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  console.log('id:', params.id);

  useEffect(() => {
    async function checkToken() {
      try {
        const response = await fetch(`${API_URL}/api/auth/check/review`, {
          credentials: 'include',
        });
        if (response.ok) {
          setVerified(true);
        }
      } catch (error) {
        console.log('error in checkToken', error);
        // setVerified(false);
      }
      setLoading(false);
    }
    checkToken();
  }, []);

  if (!verified && !loading) {
    return <Navigate to={`/review/verify/${params.id}`} />;
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

export default ReviewProtector;
