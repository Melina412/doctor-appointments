// parameters for date formatting

const locales = 'de-DE';

const options = {
  weekday: 'long',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Berlin',
  timeZoneName: 'short',
};

//todo: save locale & other preferences in db for users and then use this value

export const newAppointmentTemplate = (email, doctorname, patientname) => {
  return {
    from: '"doc appointments admin" <admin@doctorappointments.com>',
    to: email,
    subject: 'New appointment request',
    text: `
          Hello ${doctorname}!
          You have a new appointment request from ${patientname}. Go to your Dashboard [http://localhost:9999/dashboard] to send a response to the patient. Doc Appointments admin`,
    html: `
          <div style='font-family: system-ui, -apple-system, sans-serif, Arial'>
          <h2>Hello ${doctorname}!</h2>
          <p>You have a new appointment request from <span style='font-weight: bold'>${patientname}</span>.</p>
          <p>Go to your <a href='http://localhost:9999/dashboard'>Dashboard</a> to send a response to the patient.</p>
          </br>
          <p>Doc Appointments admin</p>
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
    subject: 'Appointment confirmation',
    text: `
          Hello ${patientname}!
        Your appointment with ${doctorname} has been confirmed. Appointment Date: ${date.toLocaleDateString(
      locales,
      options
    )}. Doc Appointments admin`,
    html: `
          <div style='font-family: system-ui, -apple-system, sans-serif, Arial'>
          <h2>Hello ${patientname}!</h2>
          <p>Your appointment with <span style='font-weight: bold'>${doctorname}</span> has been confirmed.</p>
          <p>Appointment Date: ${date.toLocaleDateString(locales, options)}.</p>
          </br>
          <p>Doc Appointments admin</p>
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
  console.log(
    'confirmAppointmentTemplate date:',
    date,
    'with locales:',
    date.toLocaleDateString(locales, options)
  );
  return {
    from: '"doc appointments admin" <admin@doctorappointments.com>',
    to: patientemail,
    subject: 'Appointment declined',
    text: `
          Hello ${patientname}!
        Unfortunately your appointment with ${doctorname} has been declined. Appointment Date: ${date.toLocaleDateString(
      locales,
      options
    )}. Please contact your doctor [${doctoremail}] or try booking another slot. Doc Appointments admin`,
    html: `
          <div style='font-family: system-ui, -apple-system, sans-serif, Arial'>
          <h2>Hello ${patientname}!</h2>
          <p>Unfortunately your appointment with <span style='font-weight: bold'> ${doctorname}</span> has been declined.</p>
          <p>Please <a href='mailto:${doctoremail}'>contact your doctor</a> or try booking another slot.</p>
          <p>Appointment Date: ${date.toLocaleDateString(locales, options)}.</p>
          </br>
          <p>Doc Appointments admin</p>
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
    subject: 'Review your doctor appointment',
    text: `
          Hello ${patientname}!
         Tell us about your appointment with ${doctorname} on ${date.toLocaleDateString(
      locales,
      options
    )}.
         You can rate your doctor and leave a review here [${link}].
         To write a review enter this code to verify your identity: ${code}. Doc Appointments admin`,
    html: `
          <div style='font-family: system-ui, -apple-system, sans-serif, Arial'>
          <h2>Hello ${patientname}!</h2>
          <p>Tell us about your appointment with <span style='font-weight: bold'> ${doctorname}</span> on ${date.toLocaleDateString(
      locales,
      options
    )}.</p>
          <p>You can rate your doctor and leave a review <a href='${link}'>here</a></p>
          <p>To write a review enter this code to verify your identity: <span style='font-weight: bold'> ${code}</span>.</p>
          </br>
          <p>Doc Appointments admin</p>
          </div>`,
  };
};
