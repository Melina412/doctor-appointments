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
      {!apptSent && (
        <section>
          <p className='notice'>
            Select an available day and time slot to send a appointment request
            to {doctor?.name}.
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
        setSelectedTime={setSelectedTime}
      />
    </main>
  );
}

export default Appointment;
