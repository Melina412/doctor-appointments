import { Link, useParams } from 'react-router-dom';
import '../scss/DoctorDetails.scss';

function DoctorDetails({ doctors }) {
  const params = useParams();
  // console.log('params ', params); // warum ist das ein objekt ???

  const doctor = doctors?.find((item) => item._id === params.id);

  // console.log('DoctorDetails', { doctors });
  console.log('DoctorDetails ', { doctor });

  return (
    <main className='doctor-details'>
      <div className='upper-wrapper'>
        <div className='flex'>
          <Link to='/doctors' title='back'>
            <div className='icon-container'>
              <img src='/img/arrow-icon.svg' alt='arrow back icon' />
            </div>
          </Link>

          <div className='icon-container'>
            <img src='' alt='settings icon' />
          </div>
        </div>
      </div>

      <h1>DoctorDetails</h1>
      <p>{doctor?.name}</p>

      <div>
        <Link to={`/appointment/${params.id}`}>Book Appointment</Link>
      </div>
    </main>
  );
}

export default DoctorDetails;
