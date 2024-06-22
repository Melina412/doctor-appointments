function Logout({ setLogin, getLoginData, navigate }) {
  async function userLogout() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/auth/logout`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
          credentials: 'include',
        }
      );

      const response = await res.json();
      // console.log(response);

      if (res.ok) {
        // localStorage.setItem('doctor-login', false);
        // localLogin = localStorage.getItem('doctor-login');
        // setLocalStorageLogin(localLogin);
        setLogin(false);
        getLoginData();
        navigate('/');
        console.log(response.message);
      } else if (res.status === 401) {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <button onClick={userLogout}>Logout</button>
    </div>
  );
}

export default Logout;
