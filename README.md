# Doctor Appointments App

[in progress]

🔗 [Deployment ](https://doc-appointments.onrender.com/) (can take 1-2 min to spin up)

Disclaimer: This is a dummy app with fake data. None of the doctors are real and do not have any connection to real life persons or institutions.

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

### Patients

Doctor Appointments is a platform where patients can easily search for doctors and book appointments fast without having to go trough the touble of signing up or creating an account. Just open the app, search for doctor via name or specialty, check free appointments and book them. Leave your email for the doctor to respond to your appointment booking and that's it. After the appointment you'll have a review possibility to share your experience with future patients.

### Doctors

Doctors have to sign up for an account where they can fill in their data. Once the account is created, you'll have access to your personal dashboard to view and manage all your past and future appointments. You will be notified when patients request bookings and have the option to accept or decline them.

### Email notice

All mails are send to a mail trap inbox, so if you sign up you will not actually receive emails. Also the app is deployed with a free plan and will spin down with inactivity which means cron jobs will likely not run.

## Technical Features / Status

(more detailed description of tech features will follow once the app is done)

[✅] doctors can register, login & logout
<br/> [✅] doctors can create AND UPDATE their profile
<br/> [✅] doctors can create AND UPDATE visiting hours
<br/> [✅] patients can search for doctors and their specialties
<br/> [✅] patients can choose a free time slot and reserve it to request an appointment
<br/> [✅] doctors have to accept reserved time slots in order to confirm the appointment
<br/> [✅] patients receive an email to notify them about the outcome of their requested booking after the time slot has been accepted or declined by a doctor
<br/> [✅] if more than one patient reserved the same time slot, other patients will also be notified that the booking was unsuccessful
<br/> [✅] patients who visited a doctor will get an email with a link to rank their experience the day after an appointment
<br/> [✅] deployment
<br/> [✅] style (almost done) ⤵︎
<br/> [❌] media queries tablet & bigger screens
<br/> [❌] dark mode
<br/> [❌] convert svg icons to jsx for dark mode theme

## Todo

[✅] refresh token
<br/> [✅] doctors should be able to confirm the patient showed up before they're allowed to leave a review/rank (also neccessary for review initializing)
<br/> [✅] seperate register & login routes
<br/> [✅] fix logout
<br/> [✅] delete booked time slots
<br/> [✅] convert getHeaderTemplate to jsx
<br/> [✅] convert date in emails etc.
<br/> [✅] update db with new sample data
<br/> [✅] time slot format selection (12h/24h)
<br/> [✅] automatic token refresh on all authorized request routes (authFetch)
<br/> [✅] global state setting without having to use context (setGlobalState)
<br/> [❌] link patients/ & rating to doctors
<br/> [❌] archive past appointments (also to count patient number)
<br/> [❌] more feedback for user actions

## planned extra features & tools

<br/> [✅] crop/zoom avatar before upload

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

 <!-- <img src="https://img.shields.io/badge/tool%20name-485fcc?style=for-the-badge" />
 <img src="https://img.shields.io/badge/tool-name-485fcc?style=for-the-badge" /> -->
