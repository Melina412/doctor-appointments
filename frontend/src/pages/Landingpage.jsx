import { useEffect, useState } from 'react';
import SpecialtyList from '../components/SpecialtyList';
import '../scss/Landingpage.scss';

function Landingpage({ doctors }) {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    setSpecialties(
      doctors?.map((doctor, key) => ({
        specialty: doctor.specialty,
        key: doctor._id,
      }))
    );
  }, []);

  console.log('doctors landingpage:', doctors);
  console.log({ specialties });

  return (
    <main className='landingpage'>
      <h1>Landingpage</h1>
      <section className='section1'>section1</section>
      <section className='section2'>section2</section>
      <SpecialtyList specialties={specialties} />
    </main>
  );
}

export default Landingpage;
