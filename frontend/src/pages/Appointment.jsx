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
  });

  const doctor = doctors?.find((item) => item._id === params.id);
  const visitingHours = doctor?.visiting_hours;

  // console.log('appointment params ', params);
  return (
    <main className='appointment'>
      <div className='upper-wrapper'>
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
      </div>
      <h1>Appointment</h1>
      <p>book appointment for {doctor?.name}</p>
      <TimeSlots
        visitingHours={visitingHours}
        doctor={doctor}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
      <PatientForm
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        doctor={doctor}
      />
    </main>
  );
}

export default Appointment;
