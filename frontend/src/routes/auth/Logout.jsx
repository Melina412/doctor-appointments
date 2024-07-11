import getApiUrl from '../../utils/getApiUrl';

function Logout({ setLogin, getLoginData, navigate }) {
  const API_URL = getApiUrl();
  async function userLogout() {
    try {
      const res = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
      });

      const response = await res.json();
      // console.log(response);

      if (res.ok) {
        setLogin(false);
        getLoginData();
        navigate('/');
        // console.log(response.message);
      } else if (res.status === 401) {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <button className='logout' onClick={userLogout}>
        Logout
      </button>
    </>
  );
}

export default Logout;
