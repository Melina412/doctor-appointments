import { useEffect, useState } from 'react';

function TimeSlots({
  visitingHours,
  doctor,
  calendarDays,
  setCalendarDays,
  timeSlots,
  setTimeSlots,
}) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const defaultMonth = new Date().getMonth();

  const [selectedDate, setSelectedDate] = useState({ day: null, date: null });
  const [selectedTime, setSelectedTime] = useState(null);
  const [month, setMonth] = useState(months[defaultMonth]);
  const [dailySlots, setDailySlots] = useState([]);
  const [prevMonth, setPrevMonth] = useState(months[defaultMonth]);

  const user = doctor?._id;

  let year = '2024';

  //$ getCalendarDays() -----------------------------------------------------------

  async function getCalendarDays() {
    const res = await fetch(
      `${
        import.meta.env.VITE_BACKENDURL
      }/api/appointments/days?year=${year}&month=${month}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    const data = await res.json();
    console.log('calendarDays', { data });

    if (res.ok) {
      const filteredDays = data.days.filter((day) =>
        Object.keys(visitingHours).includes(day.day)
      );
      setCalendarDays({ ...data, days: filteredDays });
    }
  }

  useEffect(() => {
    getCalendarDays();
  }, [month]);
  useEffect(() => {
    if (calendarDays === null) {
      getCalendarDays();
    }
    // das klappt leider nur wenn es keine abhängigkeiten gibt. der state wird sonst nach dem ersten rendern von Appointment wieder auf null gesetzt
  });

  //$ getTimeSlots -----------------------------------------------------------

  useEffect(() => {
    async function getTimeSlots() {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKENDURL
        }/api/appointments/timeslots?user=${user}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      const data = await res.json();
      console.log('timeSlots', { data });

      if (res.ok) {
        setTimeSlots(data.timeSlots);
      }
    }
    getTimeSlots();
  }, []);

  //$ handleMonthClick -----------------------------------------------------------

  const handleDateClick = (day, date) => {
    setSelectedDate({ day: day, date: date });
  };

  const handleTimeClick = (item) => {
    setSelectedTime(item);
  };

  //$ handleMonthChange(e) -----------------------------------------------------------

  const handleMonthChange = (e) => {
    let prev = [...month].join('');
    setPrevMonth(prev);
    console.log({ prev });
    setMonth(e.target.value);

    if (prevMonth !== month) {
      setSelectedDate({ day: null, date: null });
      setDailySlots([]);
    }
  };

  //$ getDailySlots() -----------------------------------------------------------

  useEffect(() => {
    const getDailySlots = () => {
      const slots = timeSlots
        ? Object.entries(timeSlots).find(
            ([day, hours]) => day === selectedDate.day
          )
        : null;
      console.log({ slots });

      if (slots) {
        setDailySlots(slots ? Object.values(slots[1]) : []);
      }
    };
    getDailySlots();
  }, [selectedDate]);

  //! console logs -----------------------------------------------

  console.log({ month });
  //   console.log({ user });
  //   console.log({ visitingHours });
  //   console.log({ calendarDays });
  console.log('selectedDate', selectedDate);
  console.log('selectedTime', selectedTime);
  console.log('timeSlots:', timeSlots);
  console.log('dailySlots:', dailySlots);
  console.log({ prevMonth });

  return (
    <>
      <section className='calendar-days'>
        <select name='month' id='month' onChange={handleMonthChange}>
          {months.map((month, index) => (
            <option value={month} key={index}>
              {month}
            </option>
          ))}
        </select>
        <select name='year' id='year'>
          <option value='2024'>2024</option>
        </select>

        <div className='days-grid'>
          {calendarDays?.days?.map((item, index) => (
            <div
              className={`calendar-items ${
                selectedDate.date === item.date ? 'selected' : ''
              }`}
              key={index}
              onClick={() => handleDateClick(item.day, item.date)}>
              <p>{item.date}</p>
              <p>{item.day}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='time-slots'>
        <h2>Available Time</h2>

        <div className='time-grid'>
          {dailySlots?.map((item, index) => (
            <div
              className={`time-slot-items ${
                selectedTime === item ? 'selected' : ''
              }`}
              key={index}
              onClick={() => handleTimeClick(item)}>
              {item}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default TimeSlots;
