import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Landingpage from './routes/Landingpage';
import Doctors from './routes/Doctors';
import DoctorDetails from './routes/DoctorDetails';
import Appointment from './routes/Appointment';
import Login from './routes/auth/Login';
import DasboardProtector from './routes/auth/DasboardProtector';
import Dashboard from './routes/Dashboard';
import HeaderTemplate from './components/Header/HeaderTemplate';
import Fallback from './components/error/Fallback';
import Review from './routes/Review';
import ReviewProtector from './routes/auth/ReviewProtector';
import VerifyCode from './routes/auth/VerifyCode';
import Register from './routes/auth/Register';
import NotFound from './routes/NotFound';
import authFetch from './utils/authFetch.js';
import getApiUrl from './utils/getApiUrl.js';

function App() {
  const API_URL = getApiUrl();
  const [login, setLogin] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    if (loginData === null) {
      getLoginData();
    }
  }, []);
  // useEffect(() => {
  //   getLoginData();
  // }, []);

  useEffect(() => {
    fetchDoctors();
  }, []);

  //$ fetchDoctors -------------------------------------------------------

  async function fetchDoctors() {
    try {
      const res = await fetch(`${API_URL}/api/doctors`);
      if (res.ok) {
        const data = await res.json();
        setDoctors(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //$ getLoginData -------------------------------------------------------
  async function getLoginData() {
    try {
      const res = await authFetch(`${API_URL}/api/auth/userinfo`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });

      const response = await res.json();
      // console.log('response getLoginData:', response);

      if (res.ok) {
        setLogin(true);
        setLoginData(response);
      } else {
        setLoginData(null);
        // if (res.status === 204) console.log('no user data available');
      }
    } catch (error) {
      setLoginData(null);
      // console.log('token expired', error);
    }
  }

  //$ logout -------------------------------------------------

  async function userLogout() {
    try {
      const res = await authFetch(`${API_URL}/api/auth/logout`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });

      const response = await res.json();
      // console.log(response);

      if (res.ok) {
        setLogin(false);
        getLoginData();
        // console.log(response.message);
      } else if (res.status === 401) {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //$ dark mode settings -------------------------------------------------

  // handling dark mode via user os settings with window object
  //todo: style für dark mode fehlt noch
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

  // console.log({ login });
  // console.log({ loginData });
  // console.log({ localLogin });
  // console.log({ localStorageLogin });
  // console.log({ doctors });
  // console.log({ history });

  // console.log(darkModeSettings);
  // console.log('dark mode activated:', darkModeSettings.matches);
  // console.log('NODE_ENV', process.env.NODE_ENV);

  let viteenvs = import.meta.env;
  // console.log(viteenvs);

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
            <Route
              path='/register'
              element={
                <Register setLogin={setLogin} getLoginData={getLoginData} />
              }
            />
            <Route element={<DasboardProtector setLogin={setLogin} />}>
              <Route
                path='/dashboard'
                element={
                  <Dashboard
                    login={login}
                    setLogin={setLogin}
                    getLoginData={getLoginData}
                    fetchDoctors={fetchDoctors}
                  />
                }
              />
            </Route>
            <Route element={<ReviewProtector />}>
              <Route path='/review/:id' element={<Review />} />
            </Route>
            <Route path='/review/verify/:id' element={<VerifyCode />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
