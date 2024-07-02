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

  const [calendarDays, setCalendarDays] = useState(null);
  const [timeSlots, setTimeSlots] = useState(null);
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [month, setMonth] = useState({
    name: months[defaultMonth],
    index: months.indexOf(months[defaultMonth]),
  });
  const [dailySlots, setDailySlots] = useState([]);
  const [prevMonth, setPrevMonth] = useState(months[defaultMonth]);
  const [bookedAppointments, setBookedAppointments] = useState([]);

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
      // console.log({ data });

      if (res.ok) {
        setTimeSlots(data.timeSlots);
        setBookedAppointments(data.bookedAppointments);
      }
    }
    getTimeSlots();
  }, [timeSlots === null, doctor_id]);

  //$ handleMonthClick -----------------------------------------------------------

  const handleDateClick = (day, date, month, index) => {
    setSelectedDate({
      day: day,
      date: date,
      month: month,
      index: index,
      year: selectedYear,
    });
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
        let dailySlots = slots ? Object.values(slots[1]) : [];

        const confirmedAppointments = bookedAppointments.filter(
          (appointment) => appointment.confirmed
        );
        //# hier könnte ich ggf. auch die termine die null sind filtern um doppelte buchungen zu verhindern

        //? vlg. mit datum war schwierig wegen uhrzeit des termins
        const selectedDateString = `${selectedDate.year}-${String(
          selectedDate.index + 1
        ).padStart(2, '0')}-${String(selectedDate.date).padStart(2, '0')}`;
        // console.log({ selectedDateString });

        const appointmentsForSelectedDate = confirmedAppointments.filter(
          (appointment) => {
            const appointmentDate = new Date(appointment.date);
            const appointmentDateString = `${appointmentDate.getFullYear()}-${String(
              appointmentDate.getMonth() + 1
            ).padStart(2, '0')}-${String(appointmentDate.getDate()).padStart(
              2,
              '0'
            )}`;
            // console.log({ appointmentDate });
            // console.log({ appointmentDateString });
            return appointmentDateString === selectedDateString;
          }
        );

        console.log({ appointmentsForSelectedDate });

        appointmentsForSelectedDate.forEach((appointment) => {
          dailySlots = dailySlots.filter(
            (slot) => slot !== appointment.time_slot
          );
        });

        setDailySlots(dailySlots);
      }
    };
    getDailySlots();
  }, [selectedDate, bookedAppointments, timeSlots]);

  //! console logs ==================================================================

  // console.log({ month });
  // console.log(doctor);
  // console.log({ visitingHours });
  // console.log({ calendarDays });
  // console.log('selectedDate', selectedDate);
  // console.log('selectedTime', selectedTime);
  // console.log('timeSlots:', timeSlots);
  // console.log('dailySlots:', dailySlots);
  // console.log({ prevMonth });
  // console.log({ defaultMonth });
  // console.log({ selectedYear });
  // console.log({ remainingMonths });
  // console.log({ defaultYear });
  // console.log('bookedAppointments:', bookedAppointments);

  //todo bei bereits ausgewähltem time slot, wenn der day geändert wird, ist das datum trotzdem valid auch wenn der slot an dem tag nicht existiert. bei klich auf das item muss also time slot noch zurückgesetzt werden!

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
