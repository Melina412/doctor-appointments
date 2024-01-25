import { Link } from 'react-router-dom';

function SpecialtyItem({ specialty }) {
  return (
    <div className='specialty-item'>
      <Link
        to={`/doctors`}
        title={`show ${specialty.specialty} doctors`}
        onClick={() =>
          sessionStorage.setItem('doctorSpecialty', specialty.specialty)
        }>
        <div>
          <img src='' alt='specialty icon' />
        </div>
        <h1>{specialty.specialty}</h1>
        <h2>number of Doctors</h2>
      </Link>
    </div>
  );
}

export default SpecialtyItem;
