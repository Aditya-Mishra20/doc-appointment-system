import { User } from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";
import { Doctor } from "../models/doctorModel.js";
import { Appointment } from "../models/appointmentModel.js";

//Register Callback

export const registerController = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: `User Already Exists`, success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(201)
      .send({ message: "Registered Successfully!", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller : ${error.message}`,
    });
  }
};

// login callback
export const loginController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not Exist!", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Password!", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).send({
        message: "LoggedIn Successfully!",
        success: true,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL:  ${error.message}` });
  }
};

export const authController = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "auth error", success: false, error });
  }
};

export const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await Doctor({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for Doctor Account.`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await User.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied Successfully.",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error while applying doctor", success: false, error });
  }
};

export const getAllNotificationController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read.",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in getting notification",
      success: false,
      error,
    });
  }
};

export const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      message: "all notifications deleted successfully!",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error deleting notifications!",
      success: false,
      error,
    });
  }
};

// get all doctors
export const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "doctor list fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching doctors.",
      error,
    });
  }
};

// book appointment

export const bookAppointmentController = async (req, res) => {
  try {
    // console.log("req ::", req.body);

    req.body.status = "pending";
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "new-appointment-request",
      message: `New appointment request from ${req.body.userInfo.name}`,
      onClick: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "appointment book successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " appointment booking failed! ",
      error,
    });
  }
};

//booking Availability Controller
export const bookingAvailabilityController = async (req, res) => {
  try {
    const doctorInfo = req.body.doctorId;
    const date = req.body.date; // '17-09-2024'
    const time = req.body.time; // '06:00 AM'
    const appointments = await Appointment.find({
      $and: [{ doctorInfo }, { date }, { time }, { status: "approved" }],
    });

    if (appointments.length == 0)
      res.status(200).send({
        success: true,
        message: "Appointment Available at this time.",
      });

    // if appointments found then
    if (appointments) {
      if (appointments.length === 1 && appointments[0].status == "approved") {
        res.status(200).send({
          success: false,
          message: "Appointment not available at this time. ",
          appointments,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Booking",
      error,
    });
  }
};

export const userAppointmentController = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Appointments Fetch Successfully!",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed Listing Appointments!",
      error,
    });
  }
};
