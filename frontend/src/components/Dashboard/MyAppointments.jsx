import { useState, useEffect } from 'react';
import AppointmentItem from './AppointmentItem';

// dieses feature ist noch nicht fertig

function MyAppointments() {
  const [myAppointments, setMyAppointments] = useState([]);

  useEffect(() => {
    getMyAppointments();
  }, []);

  async function getMyAppointments() {
    const res = await fetch(
      `${import.meta.env.VITE_BACKENDURL}/api/appointments`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
      }
    );
    const data = await res.json();
    // console.log('my appointments', { data });d

    if (res.ok) {
      setMyAppointments(data);
    }
  }

  console.log('myAppointments', myAppointments);

  return (
    <>
      <section className='incoming-reservations'>
        <h1>My Appointments</h1>
        {myAppointments?.map((appt, index) => (
          <AppointmentItem
            key={index}
            appt={appt}
            allAppointments={myAppointments}
            getMyAppointments={getMyAppointments}
          />
        ))}
      </section>
      <section className='confirmed'></section>
      <section className='declined'></section>
    </>
  );
}

export default MyAppointments;
