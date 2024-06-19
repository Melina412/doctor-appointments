import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
// import { createBrowserHistory } from 'history';

import Landingpage from './pages/Landingpage';
import Doctors from './pages/Doctors';
import DoctorDetails from './pages/DoctorDetails';
import Appointment from './pages/Appointment';
import Login from './routes/Login';
import DasboardProtector from './routes/DasboardProtector';
import Dashboard from './pages/Dashboard';
import HeaderTemplate from './components/Header/HeaderTemplate';
import Fallback from './components/error/Fallback';
import Review from './routes/Review';
import ReviewProtector from './routes/ReviewProtector';
import Verify from './routes/Verify';

function App() {
  const [login, setLogin] = useState(false);
  const [loginData, setLoginData] = useState(null);
  // const [localStorageLogin, setLocalStorageLogin] = useState(false); //! brauche ich das noch??? -> hoffentlich nicht ^^
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);

  // const history = createBrowserHistory();

  // let localLogin = localStorage.getItem('doctor-login');

  // useEffect(() => {
  //   setLocalStorageLogin(localLogin);
  // }, []);

  useEffect(() => {
    if (loginData === null) {
      getLoginData();
    }
  }, []);
  // um die login data beim ändern des profils zu aktualisieren muss ich die refresh token route noch ins frontend einbauen (nicht fertig)

  useEffect(() => {
    fetchDoctors();
  }, []);

  //$ fetchDoctors -------------------------------------------------------

  async function fetchDoctors() {
    const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/doctors`);
    if (res.ok) {
      const data = await res.json();
      setDoctors(data);
    }
  }

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
      // console.log('response getLoginData:', response);

      if (res.ok) {
        setLogin(true);
        setLoginData(response);
        // setLocalStorageLogin(true);
      } else {
        // localStorage.setItem('doctor-login', false);
        setLoginData(null);
      }
    } catch (error) {
      setLoginData(null);
      console.error('token expired', error);
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
      // console.log(response);

      if (res.ok) {
        // localStorage.setItem('doctor-login', false);
        // localLogin = localStorage.getItem('doctor-login');
        // setLocalStorageLogin(localLogin);
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
  // das wurde noch nich implementiert weil der style noch komplett fehlt
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
  // console.log({ loginData });
  // console.log({ localLogin });
  // console.log({ localStorageLogin });
  console.log({ doctors });
  // console.log({ history });

  // console.log(darkModeSettings);
  // console.log('dark mode activated:', darkModeSettings.matches);

  return (
    <>
      <ErrorBoundary FallbackComponent={Fallback}>
        <BrowserRouter>
          <HeaderTemplate
            loginData={loginData}
            userLogout={userLogout}
            login={login}
          />
          <Routes>
            <Route
              path='/'
              element={
                <Landingpage
                  doctors={doctors}
                  specialties={specialties}
                  setSpecialties={setSpecialties}
                />
              }
            />
            <Route
              path='/doctors'
              element={
                <Doctors
                  doctors={doctors}
                  setDoctors={setDoctors}
                  specialties={specialties}
                />
              }
            />
            <Route
              path='/doctor/details/:id'
              element={<DoctorDetails doctors={doctors} />}
            />
            <Route
              path='/appointment/:id'
              element={<Appointment doctors={doctors} />}
            />
            <Route
              path='/login'
              element={
                <Login setLogin={setLogin} getLoginData={getLoginData} />
              }
            />
            <Route element={<DasboardProtector setLogin={setLogin} />}>
              <Route
                path='/dashboard'
                element={
                  <Dashboard
                    login={login}
                    getLoginData={getLoginData}
                    fetchDoctors={fetchDoctors}
                  />
                }
              />
            </Route>
            <Route element={<ReviewProtector />}>
              <Route path='/review/:id' element={<Review />} />
            </Route>
            <Route path='/review/verify/:id' element={<Verify />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
