# Doctor Appointments App

(in progress)

## Stack

<div>
 <img src="https://img.shields.io/badge/MongoDB-47A248.svg?style=for-the-badge&logo=MongoDB&logoColor=white" />
 <img src="https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white" />
 <img src="https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black" />
 <img src="https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white" />
 <img src="https://img.shields.io/badge/Mongoose-880000.svg?style=for-the-badge&logo=Mongoose&logoColor=white" />
 <img src="https://img.shields.io/badge/Sass-CC6699.svg?style=for-the-badge&logo=Sass&logoColor=white" />
 <img src="https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white" />
</div>

## Features

[✅] doctors can register, login & logout
<br/> [✅] doctors can create AND UPDATE their profile
<br/> [✅] doctors can create AND UPDATE visiting hours
<br/> [✅] patients can search for doctors and their specialties
<br/> [✅] patients can choose a free time slot and reserve it to request an appointment
<br/> [✅] doctors have to accept reserved time slots in order to confirm the appointment
<br/> [✅] patients receive an email to notify them about the outcome of their requested booking after the time slot has been accepted or declined by a doctor
<br/> [✅] if more than one patient reserved the same time slot, other patients will also be notified that the booking was unsuccessful
<br/> [✅] patients who visited a doctor will get an email with a link to rank their experience the day after an appointment
-- steps:
<br/> - cron job to send email to patient with review link + code to authorize ✅
<br/> - new route in react ✅
<br/> - protect route ✅
<br/> - save code & path in db ✅
<br/> - create review access token on correct code input ✅
<br/> - delete cookie, path & code ✅
😬😬😬😬😬
<br/> [✅] deployment
<br/> [❌] style

## Todo

[✅] refresh token
<br/> [✅] doctors should be able to confirm the patient showed up before they're allowed to leave a review/rank (also neccessary for review initializing)
<br/> [❌] archive past appointments (also to count patient number)
<br/> [✅] seperate register & login routes
<br/> [✅] fix logout
<br/> [❌] delete booked time slots
<br/> [❌] convert getHeaderTemplate to jsx
<br/> [❌] link patients/ & rating to doctors

## planned extra features & tools

<br/> [❌] more tests, also for react
<br/> [❌] autocomplete search with debounce
<br/> [❌] use navigate to remember scroll position
<br/> [❌] b version with luxon instead manual generator function
<br/> [❌] doctors can cancel already confirmed appointment

## Tools used

- docker
- JWT
- jest, supertest
- cloudinary
- react error boundary
- cron job

<!-- ## Sample Data -->

<!-- todo: data models checken und neue daten erstellen  -->

<!-- sample dataset can be uploaded to mongodb from within directory backend/src/ with the command: -->

<!-- `mongoimport --uri 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<db name>?' --collection '<collection name>' --file 'sample-data.json' --jsonArray` -->
