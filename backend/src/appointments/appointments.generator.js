export function generateCalendarDays(startDate) {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const startDay = startDate.getDate();
  const today = new Date();

  // console.log({ startDay });
  // console.log({ startMonth }); // index!
  // console.log({ today });
  // console.log({ startDate });

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

  const monthOverview = {};
  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    const currentMonth = new Date(startYear, startMonth + monthIndex, 1);
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const monthDays = [];

    for (let day = 1; day <= daysInMonth; day++) {
      // hier fange ich immer bei day 1 an -> das passt jetzt, der aktuelle monat wird später gefiltert
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );

      const dayOfWeek = date.toLocaleDateString('en-US', {
        weekday: 'short',
      });

      if (monthIndex === 0 && date < today) {
        // hier prüfe ich jetzt noch ob das datum im aktuellen monat < today ist und wenn ja skippe den nächsten schritt
        continue;
      }

      monthDays.push({ date: day, day: dayOfWeek });
    }

    // console.log({ monthIndex }, { startMonth }, { monthDays });

    if (monthDays.length > 0) {
      monthOverview[months[startMonth + monthIndex]] = monthDays;
      // der currentMonthIndex wird jetzt durch startMonth + monthIndex berechnet
    }
  }

  // console.log('month overview: ', monthOverview);
  return { [startYear]: monthOverview };
}

export function generateTimeSlots(selectedDay, visitingHours, hour12) {
  if (visitingHours[selectedDay]) {
    const timeSlots = [];
    const { open, close } = visitingHours[selectedDay];

    if (open && close) {
      const startTime = new Date(`2000-01-01T${open}`);
      const endTime = new Date(`2000-01-01T${close}`);

      let currentTime = startTime;
      while (currentTime < endTime) {
        const slot = currentTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        // ich könnte die slots hier mit einem parameter entsprechend im 12/24 h format ausgeben, dann würden sie aber nicht einheitlich in der db gespeichert werden
        timeSlots.push(slot);
        currentTime.setMinutes(currentTime.getMinutes() + 30);
      }
    }
    return timeSlots;
  } else {
    return [];
  }
}
