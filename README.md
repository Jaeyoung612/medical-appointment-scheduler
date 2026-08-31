# medical-appointment-scheduler
IFN636 Assessment 1 - Medical Appointment Scheduler: Sunny Bite Dental

## Main Features

### Patient

- Login
- Select a dentist, date and available time
- Book an appointment
- View upcoming appointments
- Cancel an appointment

### Receptionist

- Login
- View appointments in a weekly dashboard
- Filter appointments by dentist
- Create appointments for patients

## Architecture Summary

The application uses a client-server architecture.

- Frontend: React
- Backend: Node.js and Express
- Database: MySQL

The React frontend communicates with the Express backend through REST API endpoints. The backend handles authentication, appointment operations and database access.

## Setup

### Backend

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm start
```

The frontend runs on:

```text
http://localhost:3000
```

## Testing

Backend tests use Mocha, Chai and Sinon.

Run the tests from the backend directory:

```bash
npm test
```

The current backend tests cover:

- Duplicate appointment slot checking
- Appointment creation
- Appointment cancellation

## Known Limitations

- The prototype uses a fixed one-week appointment window.
- Dynamic calendar navigation is not implemented.
- Patients cannot modify an existing appointment. They must cancel the appointment and create a new booking.
- The patient interface focuses on upcoming appointments.
- User session management and logout functionality are outside the implemented workflow.
- Appointment status management and notifications are not implemented in the frontend.

## Deployment

Deployment URL: To be added after EC2 deployment.

