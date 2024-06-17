import { useEffect, useState } from 'react';
import PatientForm from '../Appointment/PatientForm';

function AppointmentItem({ appt, allAppointments, getMyAppointments }) {
  // console.log({ appt });
  let date = new Date(appt?.date);
  let status = appt?.confirmed;
  let patient = appt?.patient;
  let id = appt?._id;
  const [action, setAction] = useState(null);
  // console.log({ action });

  async function updateAppointmentStatus() {
    console.log('action an server:', action);
    if (action !== null) {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKENDURL
        }/api/appointments/confirm?id=${id}&action=${action}`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          credentials: 'include',
        }
      );
      const response = await res.json();

      if (res.ok) {
        console.log(response.message);
        getMyAppointments();
        setAction(null);
      } else {
        console.error(response.message);
      }
    } else {
      console.error('no action selected');
    }
  }

  return (
    <div className='appt-item'>
      <p>date: {date.toLocaleString()}</p>
      <p>responsed: {status !== null ? 'yes' : 'no'}</p>
      <p>
        {' '}
        {status == true && '✅ accepted'} {status == false && '❎ declined'}{' '}
        {status == null && '📥 new request'}
      </p>
      <p>patient name: {patient?.full_name}</p>

      <button
        className='info'
        onClick={() =>
          document.getElementById(`id-${patient?._id}`).showModal()
        }>
        show patient info
      </button>
      <dialog id={`id-${patient?._id}`} className='modal'>
        <div className='modal-box'>
          <h2>Patient Info</h2>
          <p className=''>patient name: {patient?.full_name}</p>
          <p>email: {patient?.email}</p>
          <p>age group: {patient?.age_group}</p>
          <p>gender: {patient?.gender}</p>
          <p>problem: {patient?.problem}</p>
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button>Ok</button>
            </form>
          </div>
        </div>
      </dialog>

      {allAppointments.some(
        (item) => item.date === appt.date && item._id !== appt._id
      ) && <p className='warning'>double booking!</p>}
      {status === null ? (
        <div>
          <input
            type='radio'
            name={`btn-action-${appt?._id}`}
            id={`confirm-${appt?._id}`}
            value='confirm'
            onChange={(e) => setAction(e.target.value)}
          />
          <label htmlFor={`confirm-${appt?._id}`}>confirm</label>

          <input
            type='radio'
            name={`btn-action-${appt?._id}`}
            id={`decline-${appt?._id}`}
            value='decline'
            onChange={(e) => setAction(e.target.value)}
          />
          <label htmlFor={`decline-${appt?._id}`}>decline</label>
          <button onClick={updateAppointmentStatus}>Send Response</button>
        </div>
      ) : (
        <div>
          <button>~~cancel appointment ~~</button>
        </div>
      )}
    </div>
  );
}

export default AppointmentItem;
