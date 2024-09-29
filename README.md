# DocSlot

- DocSlot is a doctor appointment system.
- You can find all types of doctor at one place to book an appointment.
- If you are a doctor you can enlist yourself to find potential clients.
- Checkout Deployment 👉 [GO LIVE](https://docslot-five.vercel.app/])

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

## Glimpses
<details>
<summary>Screenshots (Step by Step)</summary>
<img src="https://github.com/user-attachments/assets/173cb479-d99f-4134-9c2b-50ffff987e1c" style="width: 200px; height: 500px;" alt="User Register">
<img src="https://github.com/user-attachments/assets/8c74318f-9e97-4c8b-a8e8-678ce7a97bfb" style="width: 200px; height: 500px;" alt="User Login">
<img src="https://github.com/user-attachments/assets/16757eca-5085-46de-a622-db2055ac9991" style="width: 200px; height: 500px;" alt="User Dashboard">
<img src="https://github.com/user-attachments/assets/f20cbaff-35a2-46b5-979c-dceeb722fea0" style="width: 200px; height: 500px;" alt="User Apply for Doctor">
<img src="https://github.com/user-attachments/assets/07750ff2-c722-4104-b82f-5bd1787a58ee" style="width: 200px; height: 500px;" alt="User Apply for Doctor submission">
<img src="https://github.com/user-attachments/assets/4952d3ff-50d8-4e38-a6f4-132d629ef100" style="width: 200px; height: 500px;" alt="Admin gets notified.">
<img src="https://github.com/user-attachments/assets/76e47081-c5ee-4859-81c0-61fec1f90f1b" style="width: 200px; height: 500px;" alt="Admin Approves the request.">
<img src="https://github.com/user-attachments/assets/18f4df0e-22da-4583-b33c-2bb0f126c5f2" style="width: 200px; height: 500px;" alt="User gets notified">
<img src="https://github.com/user-attachments/assets/ad28f800-c81d-4bb4-a63d-b484b34f314f" style="width: 200px; height: 500px;" alt="Patient Registers.">
<img src="https://github.com/user-attachments/assets/42303122-d6dd-4e99-9141-a95a40625bc5" style="width: 200px; height: 500px;" alt="Patient boooks appointment but misses range">
<img src="https://github.com/user-attachments/assets/97a45203-096e-4921-88dc-3816d5ea5103" style="width: 200px; height: 500px;" alt="Patient books appointment">
<img src="https://github.com/user-attachments/assets/aee2542d-1fbe-4d88-9e8e-bdee383e0b67" style="width: 200px; height: 500px;" alt="Doctor gets notified">
<img src="https://github.com/user-attachments/assets/3ff7c46e-f527-4533-aa7b-a5eae923864c" style="width: 200px; height: 500px;" alt="Doctor Approves">
<img src="https://github.com/user-attachments/assets/edab1908-e433-4b71-b5c2-9112309508aa" style="width: 200px; height: 500px;" alt="Patient get notified">
</details>


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

