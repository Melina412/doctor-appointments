import SpecialtyList from '../components/Landingpage/SpecialtyList';
import '../scss/Landingpage.scss';
import { Link } from 'react-router-dom';

function Landingpage({ doctors, specialties, setSpecialties }) {
  // console.log('doctors landingpage:', doctors);

  return (
    <>
      <main className='landingpage'>
        <section className='covid'>
          <div>
            <Link
              to='/doctors'
              title='show Covid-19 specialists'
              onClick={() =>
                sessionStorage.setItem('doctorSpecialty', 'Virology')
              }>
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
              <Link
                to='/doctors'
                title='show STI specialists'
                onClick={() => {
                  sessionStorage.setItem('doctorSpecialty', 'Dermatology');
                }}>
                <div className='icon-container'>
                  <img
                    src='/img/forward-arrow-icon.png'
                    alt='arrow forward icon'
                  />
                </div>
              </Link>
            </div>
          </div>
        </section>
        <SpecialtyList
          doctors={doctors}
          specialties={specialties}
          setSpecialties={setSpecialties}
        />
      </main>
    </>
  );
}

export default Landingpage;
