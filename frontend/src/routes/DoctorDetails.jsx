import { Link, useParams } from 'react-router-dom';
import '../scss/DoctorDetails.scss';

function DoctorDetails({ doctors }) {
  const params = useParams();
  // console.log('params ', params); //! object !!!!!

  const doctor = doctors?.find((item) => item._id === params.id);

  // console.log('DoctorDetails', { doctors });
  // console.log('DoctorDetails ', { doctor });

  return (
    <main className='doctor-details'>
      <div className='upper-bg'>
        <section className='avatar'>
          <div className='avatar-container'>
            <div
              className='blur-bg'
              style={{ backgroundImage: `url(${doctor?.avatar})` }}></div>
            <img width={100} src={doctor?.avatar} alt='avatar' />
          </div>
          <p className='name'>{doctor?.name}</p>
          <p className='specialty'>{doctor?.specialty}</p>
        </section>
        <section className='stats'>
          <div className='wrapper'>
            <article>
              <div className='img-container'>
                <img src='/img/details/patients.svg' alt='patients' />
              </div>
              <p className='number'>
                <span>1000</span>+
              </p>
              <p className='category'>Patients</p>
            </article>

            <article>
              <div className='img-container'>
                <img src='/img/details/experience.svg' alt='experience' />
              </div>
              <p className='number'>
                <span>10</span> Yrs
              </p>
              <p className='category'>Experience</p>
            </article>

            <article>
              <div className='img-container'>
                <img src='/img/details/rating.svg' alt='rating' />
              </div>
              <p className='number'>4.5</p>
              <p className='category'>Rating</p>
            </article>
          </div>
        </section>
      </div>

      <section className='info'>
        <h2>About Doctor</h2>
        <p className='about'>{doctor?.about}</p>
        <div className='working-time'>
          <h3>Working time</h3>
          {doctor?.visiting_hours &&
            Object.entries(doctor.visiting_hours).map(([day, hours]) => (
              <p key={day}>
                {day}: {hours.open} to {hours.close}
              </p>
            ))}
        </div>
        <h3>Communication</h3>
        <div className='communication-wrapper'>
          <article>
            <div>
              <img src='/img/details/message.svg' alt='message' />
            </div>
            <div>
              <p className='title'>Messaging</p>
              <p className='text'>Chat, share photos.</p>
            </div>
          </article>

          <article>
            <div>
              <img src='/img/details/call.svg' alt='message' />
            </div>
            <div>
              <p className='title'>Audio Call</p>
              <p className='text'>Call your doctor directly.</p>
            </div>
          </article>

          <article>
            <div>
              <img src='/img/details/video.svg' alt='message' />
            </div>
            <div>
              <p className='title'>Video Call</p>
              <p className='text'>See your doctor live.</p>
            </div>
          </article>
        </div>
      </section>

      <div className='btn'>
        <Link to={`/appointment/${params.id}`}>Book Appointment</Link>
      </div>
    </main>
  );
}

export default DoctorDetails;
