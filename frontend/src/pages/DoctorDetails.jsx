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
      <p>{doctor?.name}</p>
      <img width={100} src={doctor?.avatar} alt='avatar' />
      <p>{doctor?.specialty}</p>
      <div>--stats--</div>
      <h3>About Doctor</h3>
      <p>{doctor?.about}</p>
      <div>
        <h3>Working time</h3>
        {doctor?.visiting_hours &&
          Object.entries(doctor.visiting_hours).map(([day, hours]) => (
            <p key={day}>
              {day}: from {hours.open} to {hours.close}
            </p>
          ))}
      </div>
      <h3>Communication</h3>
      <div>--communication--</div>

      <div>
        <Link to={`/appointment/${params.id}`}>Book Appointment</Link>
      </div>
    </main>
  );
}

export default DoctorDetails;
