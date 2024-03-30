import { Link } from 'react-router-dom';

function SpecialtyItem({ specialty }) {
  return (
    <div className='specialty-item'>
      <Link
        to={`/doctors`}
        title={`show ${specialty} doctors`}
        onClick={() => sessionStorage.setItem('doctorSpecialty', specialty)}>
        <div className='icon'>
          <img src='/img/brain-icon.svg' alt='specialty icon' />
        </div>
        <p className='specialty'>{specialty}</p>
        <p className='number'>number of Doctors</p>
      </Link>
    </div>
  );
}

export default SpecialtyItem;
