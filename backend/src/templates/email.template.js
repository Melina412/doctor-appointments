export const newAppointmentTemplate = (email, doctorname, patientname) => {
  return {
    from: '"doc appointments admin" <admin@doctorappointments.com>',
    to: email,
    subject: 'new appointment request',
    text: `
          Hello ${doctorname}!
          You have a new appointment request from ${patientname}. Go to your Dashboard [http://localhost:9999/dashboard] to send a response to the patient. LG, admin`,
    html: `
          <div style='font-family: system-ui, -apple-system, sans-serif, Arial'>
          <h2>Hello ${doctorname}!</h2>
          <p>You have a new appointment request from <span style='font-weight: bold'>${patientname}</span>.</p>
          <p>Go to your <a href='http://localhost:9999/dashboard'>Dashboard</a> to send a response to the patient.</p>
          <p>LG, doc appointments admin</p>
          </div>`,
  };
};
