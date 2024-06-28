import { Link } from 'react-router-dom';
import { useState } from 'react';

function SpecialtyItem({ specialty, number }) {
  const [src, setSrc] = useState(
    `/img/specialties/${specialty?.toLowerCase()}.svg`
  );
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setSrc('/img/specialties/placeholder.svg');
      setHasError(true);
    }
  };
  // console.log({ specialty });
  return (
    <Link
      to={`/doctors`}
      title={`show ${specialty} doctors`}
      onClick={() => sessionStorage.setItem('doctorSpecialty', specialty)}>
      <div className='specialty-item'>
        <div className='icon'>
          <img src={src} alt='specialty icon' onError={handleError} />
        </div>
        <p className='specialty'>{specialty}</p>
        <p className='number'>
          <span>{number}</span> {number === 1 ? 'Doctor' : 'Doctors'}
        </p>
      </div>
    </Link>
  );
}

export default SpecialtyItem;
