import { useState, useEffect } from 'react';
import AppointmentItem from './AppointmentItem';

// dieses feature ist noch nicht fertig

function IncomingReservations() {
  const [myAppointments, setMyAppointments] = useState([]);

  useEffect(() => {
    async function getMyAppointments() {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/user/my-appointments`,
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
    getMyAppointments();
  }, []);

  // console.log('myAppointments', myAppointments);

  return (
    <section className='incoming-reservations'>
      <h1>incoming reservations</h1>
      {myAppointments?.map((appt, index) => (
        <AppointmentItem key={index} appt={appt} />
      ))}
    </section>
  );
}

export default IncomingReservations;
