function TimeSlots({ visitingHours }) {
  console.log({ visitingHours });

  const selectedDay = visitingHours?.Mon;
  console.log({ selectedDay });

  function generateTimeSlots(selectedDay) {
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

  // statt 'Mon' soll das dann aus der api
  //   const mondayTimeSlots = generateTimeSlots(Mon);
  //   console.log(mondayTimeSlots);

  return <section></section>;
}

export default TimeSlots;
