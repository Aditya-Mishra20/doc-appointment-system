import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  doctorAppointmentController,
  getDoctorByIdController,
  getDoctorInfoController,
  updateProfileController,
  updateStatusController,
} from "../controllers/doctorCtrl.js";

export const doctorRouter = express.Router();

//POST single doctor profile info
doctorRouter.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//Postupdate profile
doctorRouter.post("/updateProfile", authMiddleware, updateProfileController);

//POST get doctor for booking
doctorRouter.post("/getDoctorById", authMiddleware, getDoctorByIdController);

// get appointment list 
doctorRouter.get("/doctor-appointments", authMiddleware, doctorAppointmentController)


doctorRouter.post("/update-status", authMiddleware, updateStatusController)
