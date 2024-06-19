# Doctor Appointments App

(in progress)

## Features

[✅] doctors can register, login & logout
<br/> [✅] doctors can create AND UPDATE their profile
<br/> [✅] doctors can create AND UPDATE visiting hours
<br/> [✅] patients can search for doctors and their specialties
<br/> [✅] patients can choose a free time slot and reserve it to request an appointment
<br/> [✅] doctors have to accept reserved time slots in order to confirm the appointment
<br/> [✅] patients receive an email to notify them about the outcome of their requested booking after the time slot has been accepted or declined by a doctor
<br/> [✅] if more than one patient reserved the same time slot, other patients will also be notified that the booking was unsuccessful
<br/> [❌] patients who visited a doctor will get an email with a link to rank their experience the day after an appointment
-- steps:
<br/> - cron job to send email to patient with review link + code to authorize ✅
<br/> - new route in react ✅
<br/> - protect route
<br/> - save code & path in db
<br/> - create review access token on correct code input
<br/> -

<br/> [❌] deployment
<br/> [❌] style

## Todo, planned extra features & tools

[✅] refresh token
<br/> [❌] more tests, also for react
<br/> [❌] autocomplete search with debounce
<br/> [❌] use navigate to remember scroll position
<br/> [❌] b version with luxon instead manual generator function
<br/> [❌] doctors can cancel already confirmed appointment
<br/> [❌] doctors should be able to confirm the patient showed up before they're allowed to leave a review/rank
<br/> [❌] archive past appointments (also to count patient number)

## Tools

- docker
- JWT
- jest, supertest
- cloudinary
- react error boundary
- cron job

<!-- ## Sample Data -->

<!-- sample dataset can be uploaded to mongodb from within directory backend/src/ with the command: -->

<!-- `mongoimport --uri 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<db name>?' --collection '<collection name>' --file 'sample-data.json' --jsonArray` -->
