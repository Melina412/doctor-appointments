import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

  useEffect(() => {
    getLoginData();
  }, [login]);

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
        setLoginData(response);
      }
    } catch (error) {
      console.error(error);
    }
  }
  console.log({ login });
  console.log({ loginData });

  return (
    <>
      {/* <LoginContext.Provider value={{ loginData, setLoginData }}> */}
      <BrowserRouter>
        <Header loginData={loginData} />
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctor/details' element={<DoctorDetails />} />
          <Route path='/appointment' element={<Appointment />} />
          <Route path='/login' element={<Login login={setLogin} />} />
          <Route element={<Protector />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* </LoginContext.Provider> */}
    </>
  );
}

export default App;
