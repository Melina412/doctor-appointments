import { useState, useEffect } from 'react';
import AppointmentItem from './AppointmentItem';
import _ from 'lodash';
import authFetch from '../../utils/authFetch.js';
import getApiUrl from '../../utils/getApiUrl.js';

function MyAppointments() {
  const API_URL = getApiUrl();
  const [myAppointments, setMyAppointments] = useState([]);

  useEffect(() => {
    getMyAppointments();
  }, []);

  async function getMyAppointments() {
    const res = await authFetch(`${API_URL}/api/appointments`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
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

  // console.log('myAppointments', myAppointments);
  // console.log({ view });

  return (
    <>
      <section className='my-appointments'>
        <h2>My Appointments</h2>
        <section className='requests'>
          <div className='sub-headline'>
            <button
              className={`toggle-btn ${view?.requests ? 'view' : 'hidden'}`}
              onClick={() => toggleView('requests')}
              title='toggle view'>
              <h3>Incoming Requests</h3>
            </button>
          </div>
          {view?.requests && (
            <div className='item-group' id='requests'>
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
          <div className='sub-headline'>
            <button
              className={`toggle-btn ${view?.confirmed ? 'view' : 'hidden'}`}
              onClick={() => toggleView('confirmed')}
              title='toggle view'>
              <h3>Confirmed Appointments</h3>
            </button>
          </div>
          {view?.confirmed && (
            <div className='item-group' id='confirmed'>
              {myAppointments
                ?.filter((appt) => appt?.confirmed === true)
                .sort((a, b) => {
                  if (a.done === b.done) {
                    return 0;
                  }
                  return a.done ? 1 : -1;
                })
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
          <div className='sub-headline'>
            <button
              className={`toggle-btn ${view?.declined ? 'view' : 'hidden'}`}
              onClick={() => toggleView('declined')}
              title='toggle view'>
              <h3>Declined Appointments</h3>
            </button>
          </div>
          {view?.declined && (
            <div className='item-group' id='declined'>
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

        <section className='cancelled'>
          <div className='sub-headline'>
            <button
              className={`toggle-btn ${view?.cancelled ? 'view' : 'hidden'}`}
              onClick={() => toggleView('cancelled')}
              title='toggle view'>
              <h3>Cancelled Appointments</h3>
            </button>
          </div>
          {view?.cancelled && (
            <div className='item-group' id='cancelled'>
              <div>-- no items --</div>
            </div>
          )}
        </section>
      </section>
    </>
  );
}

export default MyAppointments;
