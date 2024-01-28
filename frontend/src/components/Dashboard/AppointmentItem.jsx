function AppointmentItem({ appt }) {
  let date = new Date(appt?.date);
  let status = appt?.confirmed;
  console.log(status);
  return (
    <div>
      <p>date: {date.toLocaleString()}</p>
      <p>confirmed: {status ? 'yes' : 'no'}</p>
    </div>
  );
}

export default AppointmentItem;
