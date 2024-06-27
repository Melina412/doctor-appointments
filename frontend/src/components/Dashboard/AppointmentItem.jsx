import { useEffect, useState } from 'react';
import PatientForm from '../Appointment/PatientForm';

function AppointmentItem({ appt, allAppointments, getMyAppointments }) {
  // console.log({ appt });
  let date = new Date(appt?.date);
  let status = appt?.confirmed;
  let patient = appt?.patient;
  let id = appt?._id;
  let now = new Date();

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };

  //todo: im appt model muss vermerkt werden dass der termin done ist, damit beim nächsten laden der state nicht wieder false ist
  let doneStatus = appt?.done;

  const [action, setAction] = useState(null);
  const [done, setDone] = useState(false);

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

  async function setAppointmentDone() {
    const res = await fetch(
      `${import.meta.env.VITE_BACKENDURL}/api/review/enable`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(appt),
        credentials: 'include',
      }
    );
    const response = await res.json();

    if (res.ok) {
      console.log(response.message);
      getMyAppointments();
    } else {
      console.error(response.message);
    }
  }

  const handleDone = async () => {
    setAppointmentDone();
    setDone(true);
  };

  // console.log({ action });
  // console.log({ doneStatus });

  return (
    <>
      {/* //* ----- appointment done  *******************************************  */}
      <div className={`appt-item ${done || doneStatus ? 'done' : ''}`}>
        {now > date && status !== false && (
          <div className='done-status'>
            {status && !done && !doneStatus ? (
              <div className='appeared'>
                <p>
                  This appointment is over. Please confirm that the patient has
                  appeared ASAP!
                </p>
                <button onClick={handleDone}>Confirm ✔︎</button>
              </div>
            ) : (
              <p>appointment done!</p>
            )}
          </div>
        )}
        {/* //* ----- date & appointment status *************************************  */}
        <div className='date-status'>
          {/* <p>responsed: {status !== null ? 'yes' : 'no'}</p> */}
          <p className='status'>
            {status == true && '✅ Accepted'}
            {status == false && '❎ Declined'}
            {status == null && '📥 New Request'}
          </p>
          <p className='date'>{date.toLocaleString('en-US', options)}</p>
        </div>

        {/* //* ----- patient name & info *************************************  */}
        <div className='patient-info'>
          <p className='patient'>{patient?.full_name}</p>

          <button
            className='info'
            onClick={() =>
              document.getElementById(`id-${patient?._id}`).showModal()
            }>
            Show Patient Info
          </button>
          <dialog id={`id-${patient?._id}`} className='modal'>
            <div className='modal-box'>
              <h2>Patient Info</h2>
              <p>
                Patient: <span>{patient?.full_name}</span>
              </p>
              <p>
                Email: <span>{patient?.email}</span>
              </p>
              <p>
                Age Group: <span>{patient?.age_group}</span>
              </p>
              <p>
                Gender: <span>{patient?.gender}</span>
              </p>
              <p>
                Problem: <span>{patient?.problem}</span>
              </p>
              <div className='modal-action'>
                <form method='dialog'>
                  {/* if there is a button in form, it will close the modal */}
                  <button>Ok</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>

        {/* //* ----- double booking warning *************************************  */}
        {allAppointments.some(
          (item) => item.date === appt.date && item._id !== appt._id
        ) && <p className='warning'>double booking!</p>}

        {/* //* ----- accept / decline request *************************************  */}
        {status === null ? (
          <div className='response'>
            <div className='radio-container'>
              {/* <div className='wrapper'> */}
              <label
                className={action === 'confirm' ? 'selected' : ''}
                htmlFor={`confirm-${appt?._id}`}>
                <input
                  type='radio'
                  name={`btn-action-${appt?._id}`}
                  id={`confirm-${appt?._id}`}
                  value='confirm'
                  onChange={(e) => setAction(e.target.value)}
                />
                Accept
              </label>
              {/* </div> */}

              {/* <div className='wrapper'> */}
              <label
                className={action === 'decline' ? 'selected' : ''}
                htmlFor={`decline-${appt?._id}`}>
                <input
                  type='radio'
                  name={`btn-action-${appt?._id}`}
                  id={`decline-${appt?._id}`}
                  value='decline'
                  onChange={(e) => setAction(e.target.value)}
                />
                Decline
              </label>
              {/* </div> */}
            </div>
            <button onClick={updateAppointmentStatus}>Send Response</button>
          </div>
        ) : (
          <div>
            {!doneStatus ||
              (status === false && <button>cancel appointment</button>)}
          </div>
        )}
      </div>
    </>
  );
}

export default AppointmentItem;
