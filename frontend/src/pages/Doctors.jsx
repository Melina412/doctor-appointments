import { useState, useEffect } from 'react';
import DoctorsList from '../components/DoctorsList';

function Doctors() {
  const [doctors1, setDoctors] = useState([]);
  console.log({ doctors1 });
  useEffect(() => {
    fetchDoctors();
  }, []);

  async function fetchDoctors() {
    const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/doctors`);
    if (res.ok) {
      const data = await res.json();
      setDoctors(data);
    }
  }

  // sample data
  let doctors = [
    {
      name: 'Dr. Cordula Kirschmeier',
      specialty: 'Orthopädie',
      avatar: 'img/avatar.png',
    },
    {
      name: 'Dr. Hans Müller',
      specialty: 'Pneumologie',
      avatar: 'img/avatar.png',
    },
    {
      name: 'Dr. Pikachu',
      specialty: 'Pokemon',
      avatar: 'img/avatar.png',
    },
  ];

  return (
    <main className='doctors'>
      <h1>Doctors</h1>
      <DoctorsList doctors={doctors1} />
    </main>
  );
}

export default Doctors;
