import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { changeAccountStatusController, getAllDoctorsController, getAllUsersController } from "../controllers/adminCtrl.js";







export const adminRouter = express.Router()


// Users List || GET 
adminRouter.get("/getAllUsers", authMiddleware, getAllUsersController)

// Doctors List || GET
adminRouter.get("/getAllDoctors", authMiddleware, getAllDoctorsController)





//Change Account Status || Post
adminRouter.post("/changeAccountStatus", authMiddleware, changeAccountStatusController)







