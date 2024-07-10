import { useState, useEffect } from 'react';
import Textarea from '../global/Textarea';
import months from '../../utils/months.js';
import getApiUrl from '../../utils/getApiUrl.js';

function PatientForm({
  selectedDate,
  selectedTime,
  setSelectedTime,
  doctor,
  apptSent,
  setApptSent,
  setMonth,
  setSelectedYear,
  setSelectedDate,
  setSelectedItem,
}) {
  const API_URL = getApiUrl();
  const index = selectedDate?.index;
  const date = selectedDate?.date;
  const timeString = selectedTime ? selectedTime : '';

  let appointmentDate = new Date(2024, index, parseInt(date));

  const format = JSON.parse(localStorage.getItem('hour12Format'));
  console.log({ format });

  const defaultMonth = new Date().getMonth();
  const defaultYear = new Date().getFullYear();

  function resetTimeFormat() {
    if (format == true) {
      const [time, period] = timeString?.split(' ');
      const [hours, minutes] = time.split(':').map((part) => parseInt(part));
      const convertedHours = period === 'AM' ? hours % 12 : (hours % 12) + 12;
      console.log('converted time hh:mm', convertedHours, minutes);
      console.log(
        { time },
        { period },
        { hours },
        { minutes },
        { convertedHours }
      );

      appointmentDate.setHours(convertedHours, minutes);
      setSelectedTime(time);
    } else {
      console.log('hours wurden nicht konvertiert');
      const [hours, minutes] = timeString
        ?.split(':')
        .map((part) => parseInt(part));
      appointmentDate.setHours(hours, minutes);
      let newhours = appointmentDate.getHours();
      let newminutes = appointmentDate.getMinutes();
      console.log(
        { appointmentDate },
        { timeString },
        { newhours },
        { newminutes }
      );
    }

    return appointmentDate;
  }

  // useEffect(() => {
  //   resetTimeFormat();
  //   let returnValue = resetTimeFormat();
  //   console.log({ returnValue });
  // }, [selectedTime, selectedDate]);

  let fictionaryDate = new Date(2024, index, parseInt(date));
  fictionaryDate.setHours(14, 30);
  // console.log({ fictionaryDate });

  // const [apptSent, setApptSent] = useState(false);

  const [selectedGender, setSelectedGender] = useState('diverse');
  const [selectedAge, setSelectedAge] = useState(false);

  // console.log({ index }, { date });

  // console.log({ timeString });
  // console.log({ selectedTime });
  // console.log({ appointmentDate }); // das ist jetzt hier nicht mehr aktuell weil die reset funktion erst beim req an den server aufgerufen wird

  async function requestAppointment(e) {
    e.preventDefault();
    let convertedDate = resetTimeFormat();
    console.log('date an server:', { convertedDate });

    if (timeString !== '' && convertedDate !== 'Invalid Date') {
      const form = new FormData(e.target);

      form.append('date', convertedDate);
      form.append('time_slot', selectedTime);
      form.append('doctor_id', doctor._id);

      // for (const entry of form.entries()) {
      //   console.log(`${entry[0]}: ${entry[1]}`);
      // }

      try {
        const res = await fetch(`${API_URL}/api/appointments/request`, {
          method: 'POST',
          body: form,
        });
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

  const handleClick = () => {
    setMonth({
      name: months[defaultMonth],
      index: months.indexOf(months[defaultMonth]),
    });
    setSelectedYear(defaultYear);
    setSelectedDate({
      day: null,
      date: null,
      month: null,
      index: null,
      year: null,
    });
    setSelectedTime(null);
    setSelectedItem(null);
    setApptSent(false);
  };

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
                      defaultSelected
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
                <Textarea
                  name='problem'
                  id='problem'
                  cols='20'
                  rows='5'
                  maxChars={200}
                />

                <button className='set' type='submit'>
                  Set Appointment
                </button>
              </form>
            </>
          ) : (
            <>
              <p>appointment request sent!</p>
              <button className='set' onClick={handleClick}>
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
