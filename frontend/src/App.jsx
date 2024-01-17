import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Doctors from './pages/Doctors';
import DoctorDetails from './pages/DoctorDetails';
import Appointment from './pages/Appointment';
import Login from './routes/Login';
import Protector from './routes/Protector';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctor/details' element={<DoctorDetails />} />
          <Route path='/appointment' element={<Appointment />} />
          <Route path='/login' element={<Login />} />
          <Route element={<Protector />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
