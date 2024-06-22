import { useEffect, useState } from 'react';

function TimeSlots({
  visitingHours,
  doctor,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  apptSent,
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

  //# constants  ---------------------------------------------------------------

  const doctor_id = doctor?._id;
  const defaultMonth = new Date().getMonth();
  const defaultYear = new Date().getFullYear();
  const yearOptions = [2024, 2025]; //todo: dynamisch immer das aktuelle und folgejahr

  //# useStates -----------------------------------------------------------------

  // const [selectedDate, setSelectedDate] = useState({ day: null, date: null });
  // const [selectedTime, setSelectedTime] = useState(null);
  const [calendarDays, setCalendarDays] = useState(null);
  const [timeSlots, setTimeSlots] = useState(null);
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [month, setMonth] = useState({
    name: months[defaultMonth],
    index: months.indexOf(months[defaultMonth]),
  });
  const [dailySlots, setDailySlots] = useState([]);
  const [prevMonth, setPrevMonth] = useState(months[defaultMonth]);

  let remainingMonths =
    selectedYear === defaultYear ? months.slice(defaultMonth) : months;

  //$ getCalendarDays() -----------------------------------------------------------

  async function getCalendarDays() {
    const res = await fetch(
      `${
        import.meta.env.VITE_BACKENDURL
      }/api/appointments/days?year=${selectedYear}&month=${month.name}&index=${
        month.index
      }`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    const data = await res.json();
    // console.log('res calendarDays', { data });
    // console.log('calendarDays month', data.month);
    // console.log('calendarDays index', months.indexOf(data.month));

    if (res.ok) {
      const filteredDays = data.days.filter((day) =>
        Object.keys(visitingHours).includes(day.day)
      );
      setCalendarDays({
        ...data,
        index: months.indexOf(data.month),
        days: filteredDays,
      });
    }
  }

  useEffect(() => {
    getCalendarDays();
  }, [month]);
  useEffect(() => {
    if (calendarDays === null) {
      getCalendarDays();
    }
    // das geht nur wenn es keine abhängigkeiten gibt. der state wird sonst nach dem ersten rendern von Appointment wieder auf null gesetzt
  });

  //$ getTimeSlots -----------------------------------------------------------

  useEffect(() => {
    async function getTimeSlots() {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKENDURL
        }/api/appointments/timeslots?doctor=${doctor_id}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      const data = await res.json();
      // console.log('timeSlots', { data });

      if (res.ok) {
        setTimeSlots(data.timeSlots);
      }
    }
    getTimeSlots();
  }, []);

  //$ handleMonthClick -----------------------------------------------------------

  const handleDateClick = (day, date, month, index) => {
    setSelectedDate({ day: day, date: date, month: month, index: index });
  };

  const handleTimeClick = (item) => {
    setSelectedTime(item);
  };

  //$ handleMonthChange(e) -----------------------------------------------------------

  const handleMonthChange = (e) => {
    let prev = [...month.name].join('');
    setPrevMonth(prev);
    // console.log({ prev });
    // setMonth(e.target.value);
    setMonth({ name: e.target.value, index: months.indexOf(e.target.value) });

    if (prevMonth !== month.name) {
      setSelectedDate({ day: null, date: null, month: null });
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

  //! console logs ==================================================================

  console.log({ month });
  // console.log(doctor);
  // console.log({ visitingHours });
  // console.log({ calendarDays });
  console.log('selectedDate', selectedDate);
  console.log('selectedTime', selectedTime);
  console.log('timeSlots:', timeSlots);
  // console.log('dailySlots:', dailySlots);
  // console.log({ prevMonth });
  console.log({ defaultMonth });
  console.log({ selectedYear });
  console.log({ remainingMonths });
  console.log({ defaultYear });

  return (
    <>
      {!apptSent && (
        <>
          <section className='calendar-days'>
            <div className='select-month'>
              <div className='select-focus'>
                <select name='month' id='month' onChange={handleMonthChange}>
                  {remainingMonths.map((month, index) => (
                    <option value={month} key={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className='select-focus'>
                <select
                  name='year'
                  id='year'
                  onChange={(e) => setSelectedYear(Number(e.target.value))}>
                  {yearOptions.map((year, index) => (
                    <option value={year} key={index}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='days-grid'>
              {calendarDays?.days?.map((item, index) => (
                <div
                  className={`calendar-items item ${
                    selectedDate.date === item.date ? 'selected' : ''
                  }`}
                  key={index}
                  onClick={() =>
                    handleDateClick(
                      item.day,
                      item.date,
                      calendarDays.month,
                      calendarDays.index
                    )
                  }>
                  <p className='date'>{item.date}</p>
                  <p className='day'>{item.day}</p>
                </div>
              ))}
            </div>
          </section>
          {selectedDate.day && (
            <section className='time-slots'>
              <h2>Available Time</h2>

              <div className='time-grid'>
                {dailySlots?.map((item, index) => (
                  <div
                    className={`time-slot-items item ${
                      selectedTime === item ? 'selected' : ''
                    }`}
                    key={index}
                    onClick={() => handleTimeClick(item)}>
                    <p className='time'>{item}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}

export default TimeSlots;
