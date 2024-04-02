export function generateCalendarDays(startDate) {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const startDay = startDate.getDate();
  const today = new Date();

  console.log({startDay});
  console.log({startMonth});
  console.log({today});
  console.log({startDate});

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
  
  
  let currentMonthIndex = startMonth;
  console.log({currentMonthIndex});
  
  months.forEach((month, index) => {
    const currentMonth = new Date(startYear, startMonth + index, 1);
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      // currentMonth.getMonth(),
      0
    ).getDate();
    const monthDays = [];
    // console.log({monthDays});

    console.log({currentMonth});
    // die brechnung bis hier ist an sich richtig, es werden nur die monate ab dem aktuellen monat berechnet

    if (currentMonth >= today) {
    for (let day = 1; day <= daysInMonth; day++) {
      // hier fange ich immer bei day 1 an das ist das erste problem. ich muss checken ob der monat mit dem aktuellen übereinstimmt und dann ab den starDay machen, ansonsten ab day 1 
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      // console.log({date});
      const dayOfWeek = date.toLocaleDateString('en-US', {
        weekday: 'short',
      });

      if (date >= today) {
        monthDays.push({ date: day, day: dayOfWeek });
        // console.log('date, day, weekday', date, day, dayOfWeek);
      }
    }
    
    if (monthDays.length > 0) {
      monthOverview[months[currentMonthIndex]] = monthDays;
      // console.log('month overview [month] :');
      // console.log(months[currentMonthIndex], monthOverview[months[currentMonthIndex]]);
    }
  }

  currentMonthIndex++;
  // es ist jetzt fast richtig, nur der aktuelle monat fehlt noch ... UND es geht nur für 2024 🤧
  });
  return { [startYear]: monthOverview };
}

export function generateTimeSlots(selectedDay, visitingHours) {
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
        });
        timeSlots.push(slot);
        currentTime.setMinutes(currentTime.getMinutes() + 30);
      }
    }
    return timeSlots;
  } else {
    return [];
  }
}
