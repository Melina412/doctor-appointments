function PatientForm({ selectedDate, selectedTime, doctor }) {
  const index = selectedDate?.index;
  const date = selectedDate?.date;
  const timeString = selectedTime ? selectedTime : '';

  let appointmentDate = new Date(2024, index, parseInt(date));
  const [time, period] = timeString?.split(' ');
  const [hours, minutes] = time.split(':').map((part) => parseInt(part));

  const convertedHours = period === 'AM' ? hours % 12 : (hours % 12) + 12;

  appointmentDate.setHours(convertedHours, minutes);

  console.log(index, date);
  console.log({ appointmentDate });

  async function requestAppointment(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    form.append('date', appointmentDate);
    form.append('time_slot', selectedTime);
    form.append('doctor_id', doctor._id);

    for (const entry of form.entries()) {
      console.log(`${entry[0]}: ${entry[1]}`);
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/appointments/request`,
        {
          method: 'POST',
          body: form,
        }
      );

      if (res.ok) {
        console.log('termin request wurde an den server geschickt');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className='patient-form'>
      <h2>Patient Details</h2>
      <form onSubmit={requestAppointment}>
        <label htmlFor='patient-name'>
          Full Name
          <input type='text' name='full_name' id='patient-name' />
        </label>

        <label htmlFor='age'>
          Age
          <select name='age' id='age'>
            <option value=''>{'age group'}</option>
            <option value='<18'>{'< 18'}</option>
            <option value='18-25'>{'18 - 25'}</option>
            <option value='26-40'>{'26 - 40'}</option>
            <option value='41-60'>{'41 - 60'}</option>
            <option value='60+'>{'60 +'}</option>
          </select>
        </label>

        <legend htmlFor='gender'>
          Gender
          <input type='radio' name='gender' id='diverse' value='diverse' />
          <label htmlFor='diverse'>Diverse</label>
          <input type='radio' name='gender' id='female' value='female' />
          <label htmlFor='female'>Female</label>
          <input type='radio' name='gender' id='male' value='male' />
          <label htmlFor='male'>Male</label>
        </legend>

        <label htmlFor='email'>
          Email
          <input type='email' name='email' id='email' />
        </label>

        <label htmlFor='problem'>
          Describe your problem
          <textarea name='problem' id='problem' cols='20' rows='5'></textarea>
        </label>
        <button type='submit'>Set Appointment</button>
      </form>
    </section>
  );
}

export default PatientForm;
