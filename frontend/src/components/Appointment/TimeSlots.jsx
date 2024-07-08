import { useEffect, useState } from 'react';
import months from '../../utils/months.js';

function TimeSlots({
  visitingHours,
  doctor,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  apptSent,
  month,
  setMonth,
  selectedYear,
  setSelectedYear,
  selectedItem,
  setSelectedItem,
}) {
  //# constants  ---------------------------------------------------------------

  const doctor_id = doctor?._id;
  const defaultMonth = new Date().getMonth();
  const defaultYear = new Date().getFullYear();
  const yearOptions = [2024, 2025]; //todo: dynamisch immer das aktuelle und folgejahr

  //# useStates -----------------------------------------------------------------

  const [calendarDays, setCalendarDays] = useState(null);
  const [timeSlots, setTimeSlots] = useState(null);
  // const [selectedYear, setSelectedYear] = useState(defaultYear);
  // const [month, setMonth] = useState({
  //   name: months[defaultMonth],
  //   index: months.indexOf(months[defaultMonth]),
  // });
  const [dailySlots, setDailySlots] = useState([]);
  const [prevMonth, setPrevMonth] = useState(months[defaultMonth]);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [hour12Format, setHour12Format] = useState(
    JSON.parse(localStorage.getItem('hour12Format')) || false
  );
  // const [selectedItem, setSelectedItem] = useState(selectedTime);

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

  //$ getDailySlots() -----------------------------------------------------------

  function switchHourFormat(slots, format) {
    const randomDate = '2000-01-01T';
    return slots.map((slot) => {
      const date = new Date(randomDate + slot);
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: format,
      });
    });
  }

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

        console.log('dailySlots aus getDailySlots: ----', dailySlots);

        let newSlots = switchHourFormat(dailySlots, hour12Format);
        console.log('newSlots: ----', newSlots);

        setDailySlots(newSlots);
      }
    };
    getDailySlots();
  }, [selectedDate, bookedAppointments, timeSlots, hour12Format]);

  //$ Event Handlers -----------------------------------------------------------

  const handleTimeFormat = (e) => {
    const format = JSON.parse(e.target.value);
    setHour12Format(format);
    localStorage.setItem('hour12Format', format);

    const newSlots = switchHourFormat(dailySlots, format);
    setDailySlots(newSlots);
    // setSelectedTime(null);
  };

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
    console.log({ item });
    setSelectedTime(item);
    setSelectedItem(item);
  };

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

  //! console logs ==================================================================

  console.log({ month });
  // console.log(doctor);
  // console.log({ visitingHours });
  // console.log({ calendarDays });
  // console.log('selectedDate', selectedDate);
  console.log('selectedTime', selectedTime);
  console.log('selectedItem', selectedItem);

  // console.log('timeSlots:', timeSlots);
  console.log('++++++++++++++++++++++++++++ dailySlots: ', dailySlots);
  // console.log({ prevMonth });
  // console.log({ defaultMonth });
  // console.log({ selectedYear });
  // console.log({ remainingMonths });
  // console.log({ defaultYear });
  // console.log('bookedAppointments:', bookedAppointments);
  // console.log({ hour12Format });

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

            <h2>Available Days</h2>
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
              <div className='select-format'>
                <h2>Available Time</h2>
                <div className='select-focus'>
                  <select name='format' id='format' onChange={handleTimeFormat}>
                    <option value={false}>24h</option>
                    <option value={true}>12h</option>
                  </select>
                </div>
              </div>

              <div className='time-grid'>
                {dailySlots?.map((item, index) => (
                  <div
                    className={`time-slot-items item ${
                      selectedItem === item ? 'selected' : ''
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
