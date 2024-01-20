import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Doctors from './pages/Doctors';
import DoctorDetails from './pages/DoctorDetails';
import Appointment from './pages/Appointment';
import Login from './routes/Login';
import Protector from './routes/Protector';
import Dashboard from './pages/Dashboard';
import { useState, useEffect } from 'react';
// import { LoginContext } from './context/LoginContext';
import Header from './components/Header';

function App() {
  const [login, setLogin] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const [localStorageLogin, setLocalStorageLogin] = useState(false); //! brauche ich das noch???

  let localLogin = localStorage.getItem('doctor-login');

  useEffect(() => {
    setLocalStorageLogin(localLogin);
  }, []);

  useEffect(() => {
    if (loginData === null) {
      getLoginData();
    }
  }, []);

  //$ getLoginData -------------------------------------------------------
  async function getLoginData() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/auth/userinfo`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
          credentials: 'include',
        }
      );

      const response = await res.json();
      console.log('response getLoginData:', response);

      if (res.ok) {
        setLogin(true);
        setLoginData(response);
        setLocalStorageLogin(true);
      } else {
        localStorage.setItem('doctor-login', false);
        setLoginData(null);
      }
    } catch (error) {
      setLoginData(null);
      console.error(error);
      console.error('das ist nur der error vom abgelaufenen token 😌');
    }
  }

  //$ logout -------------------------------------------------

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
      console.log(response);

      if (res.ok) {
        localStorage.setItem('doctor-login', false);
        localLogin = localStorage.getItem('doctor-login');
        setLocalStorageLogin(localLogin);
        setLogin(false);
        getLoginData();
        console.log(response.message);
      } else if (res.status === 401) {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //$ dark mode settings -------------------------------------------------

  // handling dark mode via user os settings with window object
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.add('light-mode');
  }
  const darkModeSettings = window.matchMedia('(prefers-color-scheme: dark)');

  //$ console logs -------------------------------------------------------

  console.log({ login });
  console.log({ loginData });
  console.log({ localLogin });
  console.log({ localStorageLogin });

  // console.log(darkModeSettings);
  // console.log('dark mode activated:', darkModeSettings.matches);

  return (
    <>
      {/* <LoginContext.Provider value={{ loginData, setLoginData }}> */}
      <BrowserRouter>
        <Header loginData={loginData} logout={userLogout} login={login} />
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctor/details' element={<DoctorDetails />} />
          <Route path='/appointment' element={<Appointment />} />
          <Route
            path='/login'
            element={<Login setLogin={setLogin} getLoginData={getLoginData} />}
          />
          <Route element={<Protector />}>
            <Route path='/dashboard' element={<Dashboard login={login} />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* </LoginContext.Provider> */}
    </>
  );
}

export default App;
