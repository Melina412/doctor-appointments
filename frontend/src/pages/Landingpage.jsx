import { useEffect, useState } from 'react';
import SpecialtyList from '../components/Landingpage/SpecialtyList';
import '../scss/Landingpage.scss';
import { Link } from 'react-router-dom';

function Landingpage({ doctors, specialties, setSpecialties }) {
  useEffect(() => {
    setSpecialties(doctors?.map((doctor) => doctor.specialty));
  }, [doctors]);
  // die specialties müssen dann noch gefiltert werden sobald es eine gibt die mehrmals vorkommt

  // console.log('doctors landingpage:', doctors);
  // console.log({ specialties });

  return (
    <main className='landingpage'>
      <h1>-- header landingpage --</h1>
      <section className='covid'>
        <div>
        <Link to='/doctors' title='doctors list'>
            <div className='img-container'>
              <img src='/img/covid-no-shadow.svg' alt='covid-19' />
            </div>
          </Link>
        </div>
      </section>
      <section className='section2'>
        <div className='wrapper'>
          <div className='flex'>
            <div className='text'>
            <h3>STI Problems?</h3>
            <p>Find suitable specialists here</p>
            </div>
            <Link to='/doctors' title='doctors list'>
            <div className='icon-container'>
              <img src='/img/forward-arrow-icon.png' alt='arrow forward icon' />
            </div>
          </Link>
          </div>
        </div>
      </section>
      <SpecialtyList specialties={specialties} />
    </main>
  );
}

export default Landingpage;
