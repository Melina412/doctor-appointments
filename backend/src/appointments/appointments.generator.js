export function generateCalendarDays(startDate) {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const startDay = startDate.getDate();

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

  months.forEach((month, index) => {
    const currentMonth = new Date(startYear, startMonth + index, 1);
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const monthDays = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const dayOfWeek = date.toLocaleDateString('en-US', {
        weekday: 'short',
      });

      if (date >= startDate) {
        monthDays.push({ date: day, day: dayOfWeek });
      }
    }

    if (monthDays.length > 0) {
      monthOverview[month] = monthDays;
    }
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
