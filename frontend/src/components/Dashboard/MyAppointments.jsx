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

  const [view, setView] = useState({
    requests: true,
    confirmed: true,
    declined: true,
    cancelled: true,
  });

  const toggleView = (section) => {
    setView((prevView) => ({
      ...prevView,
      [section]: !prevView[section],
    }));
  };

  console.log('myAppointments', myAppointments);

  return (
    <>
      <section className='my-appointments'>
        <h1>My Appointments</h1>
        <section>
          <div>
            <h2>Incoming Requests</h2>
            <button onClick={() => toggleView('requests')}>
              {view?.requests ? '︿ hide' : '﹀ view'}
            </button>
          </div>
          {view?.requests && (
            <div>
              {myAppointments
                ?.filter((appt) => appt?.confirmed === null)
                .map((appt, index) => (
                  <AppointmentItem
                    key={index}
                    appt={appt}
                    allAppointments={myAppointments}
                    getMyAppointments={getMyAppointments}
                  />
                ))}
            </div>
          )}
        </section>

        <section className='confirmed'>
          <div>
            <h2>Confirmed Appointments</h2>
            <button onClick={() => toggleView('confirmed')}>
              {view?.confirmed ? '︿ hide' : '﹀ view'}
            </button>
          </div>
          {view?.confirmed && (
            <div>
              {myAppointments
                ?.filter((appt) => appt?.confirmed === true)
                .map((appt, index) => (
                  <AppointmentItem
                    key={index}
                    appt={appt}
                    allAppointments={myAppointments}
                    getMyAppointments={getMyAppointments}
                  />
                ))}
            </div>
          )}
        </section>

        <section className='declined'>
          <div>
            <h2>Declined Appointments</h2>
            <button onClick={() => toggleView('declined')}>
              {view?.declined ? '︿ hide' : '﹀ view'}
            </button>
          </div>
          {view?.declined && (
            <div>
              {myAppointments
                ?.filter((appt) => appt?.confirmed === false)
                .map((appt, index) => (
                  <AppointmentItem
                    key={index}
                    appt={appt}
                    allAppointments={myAppointments}
                    getMyAppointments={getMyAppointments}
                  />
                ))}
            </div>
          )}
        </section>

        <section className='canceled'>
          <div>
            <h2>Canceled Appointments</h2>
            <button onClick={() => toggleView('canceled')}>
              {view?.cancelled ? '︿ hide' : '﹀ view'}
            </button>
          </div>
          {view?.cancelled && <div></div>}
        </section>
      </section>
    </>
  );
}

export default MyAppointments;
