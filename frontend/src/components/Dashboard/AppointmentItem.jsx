import PatientForm from '../Appointment/PatientForm';

function AppointmentItem({ appt, allAppointments }) {
  // console.log({ appt });
  let date = new Date(appt?.date);
  let status = appt?.confirmed;
  let patient = appt?.patient;
  let response = appt?.confirmation_response;

  return (
    <div className='appt-item'>
      <p>date: {date.toLocaleString()}</p>
      <p>confirmed: {status ? 'yes' : 'no'}</p>
      <p>
        {' '}
        {response == true && '✅'} {response == false && '❎'}{' '}
        {response == null && '📥'}
      </p>
      <p>patient name: {patient?.full_name}</p>

      <button
        onClick={() =>
          document.getElementById(`id-${patient?._id}`).showModal()
        }>
        show patient info
      </button>
      <dialog id={`id-${patient?._id}`} className='modal'>
        <div className='modal-box'>
          <h2>Patient Info</h2>
          <p>patient name: {patient?.full_name}</p>
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
      ) && <p>double booking!</p>}
      <button>Confirm</button>
      <button>Decline</button>
    </div>
  );
}

export default AppointmentItem;
