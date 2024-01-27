import { useEffect, useState } from 'react';
import SpecialtyList from '../components/Landingpage/SpecialtyList';
import '../scss/Landingpage.scss';

function Landingpage({ doctors, specialties, setSpecialties }) {
  useEffect(() => {
    setSpecialties(doctors?.map((doctor) => doctor.specialty));
  }, [doctors]);
  // die specialties müssen dann noch gefiltert werden sobald es eine gibt die mehrmals vorkommt!

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
