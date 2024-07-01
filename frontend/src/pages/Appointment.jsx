import { Link, useParams } from 'react-router-dom';
import '../scss/Appointment.scss';
import TimeSlots from '../components/Appointment/TimeSlots';
import PatientForm from '../components/Appointment/PatientForm';
import { useState } from 'react';

function Appointment({ doctors }) {
  const params = useParams();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState({
    day: null,
    date: null,
    month: null,
    index: null,
    year: null,
  });
  const [apptSent, setApptSent] = useState(false);

  const doctor = doctors?.find((item) => item._id === params.id);
  const visitingHours = doctor?.visiting_hours;

  // console.log('appointment params ', params);
  return (
    <main className='appointment'>
      {/* <div className='upper-wrapper'>
        <div className='flex'>
          <Link to={`/doctors/details/${params.id}`} title='back'>
            <div className='icon-container'>
              <img src='/img/arrow-icon.svg' alt='arrow back icon' />
            </div>
          </Link>

          <div className='icon-container'>
            <img src='' alt='settings icon' />
          </div>
        </div>
      </div> */}
      {!apptSent && (
        <section>
          <p className='notice'>
            Select an available slot & fill in your details to send a
            appointment request to {doctor?.name}.
          </p>
        </section>
      )}
      <TimeSlots
        visitingHours={visitingHours}
        doctor={doctor}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        setApptSent={setApptSent}
        apptSent={apptSent}
      />
      <PatientForm
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        doctor={doctor}
        setApptSent={setApptSent}
        apptSent={apptSent}
      />
    </main>
  );
}

export default Appointment;
