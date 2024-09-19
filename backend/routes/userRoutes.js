import express from "express";
import {
  applyDoctorController,
  authController,
  bookAppointmentController,
  bookingAvailabilityController,
  deleteAllNotificationController,
  getAllDoctorsController,
  getAllNotificationController,
  loginController,
  registerController,
  userAppointmentController,
} from "../controllers/userCtrl.js";
import authMiddleware from "../middlewares/authMiddleware.js";

//router object
export const router = express.Router();

//routes

//Login || Post
router.post("/login", loginController);

//Register || Post
router.post("/register", registerController);

// Auth || Post
router.post("/getUserData", authMiddleware, authController);


// Apply Doctor || Post
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// notification || Post
router.post("/get-all-notifications", authMiddleware, getAllNotificationController);

// delete notification || Post
router.post("/delete-all-notifications", authMiddleware, deleteAllNotificationController);


router.get("/getAllDoctors", authMiddleware, getAllDoctorsController )


//book appoinment
router.post("/book-appointment", authMiddleware, bookAppointmentController)

// booking availability check
router.post("/booking-availability", authMiddleware, bookingAvailabilityController)

// get appointment list
router.get("/user-appointments", authMiddleware, userAppointmentController)
