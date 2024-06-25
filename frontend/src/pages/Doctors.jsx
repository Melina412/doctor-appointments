import { useState, useEffect } from 'react';
import DoctorsList from '../components/Doctors/DoctorsList';
import DoctorsSearch from '../components/Doctors/DoctorsSearch';
import '../scss/Doctors.scss';

function Doctors({ doctors, setDoctors, specialties }) {
  const [filteredOutput, setFilteredOutput] = useState(doctors);
  const [value, updateValue] = useState(true);
  const homeSpecialty = sessionStorage.getItem('doctorSpecialty');

  const filteredDoctors = doctors.filter(
    (doctor) => doctor.specialty === homeSpecialty
  );

  useEffect(() => {
    if (homeSpecialty !== 'all' && homeSpecialty !== null) {
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
      <DoctorsSearch
        doctors={doctors}
        specialties={specialties}
        setFilteredOutput={setFilteredOutput}
        filteredOutput={filteredOutput}
      />
      {homeSpecialty !== 'all' && homeSpecialty !== null && (
        <>
          <div className='home-filter'>
            <button onClick={handleClick}>✕</button>
            <p>
              filter: <span>{homeSpecialty}</span>
            </p>
          </div>
        </>
      )}
      <DoctorsList doctors={filteredOutput} />
    </main>
  );
}

export default Doctors;
