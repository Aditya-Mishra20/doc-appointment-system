# DocSlot

- DocSlot is a doctor appointment system.
- You can find all types of doctor at one place to book an appointment.
- If you are a doctor you can enlist yourself to find potential clients.

## Features

### Users

- Register and login.
- If you are doctor, apply for doctor.
- Check doctor availablity.
- Book doctor at your time.
- Get notification if your appointment approved/rejected.
 Reviewing doctors.

### Doctors

- Once Applied for doctor, if approved, become doctor.
- manage appointments.

### Admin

- Manage Doctors, Keep track of doctors.
- Manage Users, keep track of users.

## Technology

### Frontend

- `React`
  - **vite** :  configure a development environment.
  - **redux toolkit** : used for state management.
  - **axios** : used to fetch data from APIs and interact with servers
  - **react-router** : managing routes.
  - **ant design** : UI Components
  - **Tailwind CSS** : used for styling.


### Backend
- `Express` :  handle HTTP requests and responses.
- `Node.js` : 
    - Processing HTTP requests
    - Interacting with databases
    - Building APIs
    - Managing user authentication and authorization
    - Executing business logic
- `MongoDB` : NOSQL database for data storage and retrival.

### how to run at your own system.
* In this project [concurrently](https://www.npmjs.com/package/concurrently) package is used for simultaneous execution of both frontend and backend.
```bash
npm run full
```
* run the above command to start backend and frontend.


## FIXES
- Add Profile pages for user and admin
- go to homepage directly from register page
- table filters.
- portfolio addition
- add names instead of ids in appointment tables.
- add feature for avatar , multer - cloudinary
- doctor search option by name , specialization.





`Note` _This project is for understanding how complete applications are build, how logics are written._

