import { useState } from 'react';
import Textarea from '../global/Textarea';

function PatientForm({
  selectedDate,
  selectedTime,
  setSelectedTime,
  doctor,
  apptSent,
  setApptSent,
}) {
  const index = selectedDate?.index;
  const date = selectedDate?.date;
  const timeString = selectedTime ? selectedTime : '';

  let appointmentDate = new Date(2024, index, parseInt(date));

  const format = JSON.parse(localStorage.getItem('hour12Format'));
  console.log({ format });
  function resetTimeFormat() {
    if (format == true) {
      const [time, period] = timeString?.split(' ');
      const [hours, minutes] = time.split(':').map((part) => parseInt(part));
      const convertedHours = period === 'AM' ? hours % 12 : (hours % 12) + 12;
      console.log('converted time hh:mm', convertedHours, minutes);

      appointmentDate.setHours(convertedHours, minutes);
      setSelectedTime(time);
    } else {
      appointmentDate.setHours(
        timeString?.split(':').map((part) => {
          parseInt(part);
          console.log(parseInt(part));
        })
      );
    }
  }
  resetTimeFormat();

  // const [apptSent, setApptSent] = useState(false);

  const [selectedGender, setSelectedGender] = useState('diverse');
  const [selectedAge, setSelectedAge] = useState(false);

  // console.log(index, date);
  // console.log({ appointmentDate });
  // console.log({ timeString });
  // console.log({ selectedTime });

  async function requestAppointment(e) {
    e.preventDefault();
    console.log(appointmentDate);
    if (timeString !== '') {
      const form = new FormData(e.target);

      form.append('date', appointmentDate);
      form.append('time_slot', selectedTime);
      form.append('doctor_id', doctor._id);

      // for (const entry of form.entries()) {
      //   console.log(`${entry[0]}: ${entry[1]}`);
      // }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKENDURL}/api/appointments/request`,
          {
            method: 'POST',
            body: form,
          }
        );
        if (res.ok) {
          setApptSent(true);
          // console.log('termin request wurde an den server geschickt');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.error('invalid date');
      if (selectedTime === null) {
        console.error('time is not selected');
      }
    }
  }

  return (
    <>
      {selectedTime && (
        <section className='patient-form'>
          {!apptSent ? (
            <>
              <h2>Patient Details</h2>
              <p className='notice'>Please fill in your contact information.</p>
              <form onSubmit={requestAppointment}>
                <label htmlFor='patient-name'>Full Name</label>
                <input type='text' name='full_name' id='patient-name' />

                <label htmlFor='age'>Age</label>
                <div className='select-focus'>
                  <select
                    name='age_group'
                    id='age'
                    className={selectedAge ? 'selected' : ''}
                    onChange={(e) => setSelectedAge(e.target.value !== '')}
                    defaultValue=''>
                    <option value=''>{'age group'}</option>
                    <option value='<18'>{'< 18'}</option>
                    <option value='18-25'>{'18 - 25'}</option>
                    <option value='26-40'>{'26 - 40'}</option>
                    <option value='41-60'>{'41 - 60'}</option>
                    <option value='60+'>{'60 +'}</option>
                  </select>
                </div>

                <legend htmlFor='gender'>Gender</legend>
                <div className='radio-container'>
                  <label
                    className={selectedGender === 'diverse' ? 'selected' : ''}
                    htmlFor='diverse'>
                    <input
                      onChange={(e) => setSelectedGender(e.target.value)}
                      type='radio'
                      name='gender'
                      id='diverse'
                      value='diverse'
                    />
                    Diverse
                  </label>
                  <label
                    className={selectedGender === 'female' ? 'selected' : ''}
                    htmlFor='female'>
                    <input
                      onChange={(e) => setSelectedGender(e.target.value)}
                      type='radio'
                      name='gender'
                      id='female'
                      value='female'
                    />
                    Female
                  </label>
                  <label
                    className={selectedGender === 'male' ? 'selected' : ''}
                    htmlFor='male'>
                    <input
                      onChange={(e) => setSelectedGender(e.target.value)}
                      type='radio'
                      name='gender'
                      id='male'
                      value='male'
                    />
                    Male
                  </label>
                </div>

                <label htmlFor='email'>Email</label>
                <input type='email' name='email' id='email' />

                <label htmlFor='problem'>Describe your problem</label>
                {/* <textarea
            name='problem'
            id='problem'
            cols='20'
            rows='5'
            maxLength={500}></textarea> */}
                <Textarea
                  name='problem'
                  id='problem'
                  cols='20'
                  rows='5'
                  maxChars={500}
                />

                <button className='set' type='submit'>
                  Set Appointment
                </button>
              </form>
            </>
          ) : (
            <>
              <p>appointment request sent!</p>
              <button className='set' onClick={() => setApptSent(false)}>
                book another appointment
              </button>
            </>
          )}
        </section>
      )}
    </>
  );
}

export default PatientForm;
