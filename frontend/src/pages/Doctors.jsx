import { useState, useEffect } from 'react';
import DoctorsList from '../components/DoctorsList';

function Doctors({ doctors, setDoctors }) {
  const [filteredOutput, setFilteredOutput] = useState(doctors);
  const [value, updateValue] = useState(true);
  const homeSpecialty = sessionStorage.getItem('doctorSpecialty');

  const filteredDoctors = doctors.filter(
    (doctor) => doctor.specialty === homeSpecialty
  );

  useEffect(() => {
    if (homeSpecialty !== 'all') {
      setFilteredOutput(filteredDoctors);
    } else {
      setFilteredOutput(doctors);
    }
  }, [value, homeSpecialty]);

  const handleClick = () => {
    sessionStorage.setItem('doctorSpecialty', 'all');
    updateValue(value === true ? false : true);
  };

  console.log({ homeSpecialty });
  console.log({ filteredDoctors });
  console.log({ filteredOutput });
  console.log({ value });

  return (
    <main className='doctors'>
      <h1>Doctors</h1>
      {homeSpecialty !== 'all' && (
        <>
          <div>
            <p>filter: {homeSpecialty}</p>
            <button onClick={handleClick}>x</button>
          </div>
        </>
      )}
      <DoctorsList doctors={filteredOutput} />
    </main>
  );
}

export default Doctors;
