import { Link, useParams } from 'react-router-dom';
import '../scss/Appointment.scss';
import TimeSlots from '../components/Appointment/TimeSlots';
import PatientForm from '../components/Appointment/PatientForm';
import { useState } from 'react';
import months from '../utils/months.js';

function Appointment({ doctors }) {
  const params = useParams();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedItem, setSelectedItem] = useState(selectedTime);
  const [selectedDate, setSelectedDate] = useState({
    day: null,
    date: null,
    month: null,
    index: null,
    year: null,
  });

  const defaultMonth = new Date().getMonth();
  const defaultYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [month, setMonth] = useState({
    name: months[defaultMonth],
    index: months.indexOf(months[defaultMonth]),
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
        apptSent={apptSent}
        setApptSent={setApptSent}
        month={month}
        setMonth={setMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <PatientForm
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        doctor={doctor}
        apptSent={apptSent}
        setApptSent={setApptSent}
        setMonth={setMonth}
        setSelectedYear={setSelectedYear}
        setSelectedItem={setSelectedItem}
      />
    </main>
  );
}

export default Appointment;
