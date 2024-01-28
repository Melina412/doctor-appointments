import PatientForm from '../Appointment/PatientForm';

function AppointmentItem({ appt }) {
  //   console.log({ appt });
  let date = new Date(appt?.date);
  let status = appt?.confirmed;
  let patient = appt?.patient;

  return (
    <div className='appt-item'>
      <p>date: {date.toLocaleString()}</p>
      <p>confirmed: {status ? 'yes' : 'no'}</p>
      <p>patient name: {patient?.full_name}</p>
    </div>
  );
}

export default AppointmentItem;
