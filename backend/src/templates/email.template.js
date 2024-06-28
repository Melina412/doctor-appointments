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

export const confirmAppointmentTemplate = (
  patientemail,
  patientname,
  doctorname,
  date,
  timeslot
) => {
  return {
    from: '"doc appointments admin" <admin@doctorappointments.com>',
    to: patientemail,
    subject: 'appointment confirmation',
    text: `
          Hello ${patientname}!
        Your appointment with ${doctorname} has been confirmed. Date: ${date}, Time: ${timeslot}. LG, doc appointments admin`,
    html: `
          <div style='font-family: system-ui, -apple-system, sans-serif, Arial'>
          <h2>Hello ${patientname}!</h2>
          <p>Your appointment with <span style='font-weight: bold'>${doctorname}</span> has been confirmed.</p>
          <p>Date: ${date}, Time: ${timeslot}.</p>
          <p>LG, doc appointments admin</p>
          </div>`,
  };
};
export const declineAppointmentTemplate = (
  patientemail,
  patientname,
  doctoremail,
  doctorname,
  date,
  timeslot
) => {
  return {
    from: '"doc appointments admin" <admin@doctorappointments.com>',
    to: patientemail,
    subject: 'appointment declined',
    text: `
          Hello ${patientname}!
        Unfortunately your appointment with ${doctorname} has been declined. Date: ${date}, Time: ${timeslot}. Please contact your doctor [${doctoremail}] or try booking another slot. LG, doc appointments admin`,
    html: `
          <div style='font-family: system-ui, -apple-system, sans-serif, Arial'>
          <h2>Hello ${patientname}!</h2>
          <p>Unfortunately your appointment with <span style='font-weight: bold'> ${doctorname}</span> has been declined.</p>
          <p>Please <a href='mailto:${doctoremail}'>contact your doctor</a> or try booking another slot.</p>
          <p>Date: ${date}, Time: ${timeslot}.</p>
          <p>LG, doc appointments admin</p>
          </div>`,
  };
};
// datum/zeit in den templates usw muss noch angepasst werden
export const reviewDoctorTemplate = (
  patientemail,
  patientname,
  doctorname,
  date,
  code,
  link
) => {
  return {
    from: '"doc appointments admin" <admin@doctorappointments.com>',
    to: patientemail,
    subject: 'review your doctor appointment',
    text: `
          Hello ${patientname}!
         Tell us about your appointment with ${doctorname}on ${date}.
         You can rate your doctor and leave a review here [${link}].
         To write a review enter this code to verify your identity: ${code}. LG, doc appointments admin`,
    html: `
          <div style='font-family: system-ui, -apple-system, sans-serif, Arial'>
          <h2>Hello ${patientname}!</h2>
          <p>Tell us about your appointment with <span style='font-weight: bold'> ${doctorname}</span> on ${date}.</p>
          <p>You can rate your doctor and leave a review <a href='${link}'>here</a></p>
          <p>To write a review enter this code to verify your identity: <span style='font-weight: bold'> ${code}</span>.</p>
          <p>LG, doc appointments admin</p>
          </div>`,
  };
};
