import { Appointment } from "../models/appointmentModel.js";
import { Doctor } from "../models/doctorModel.js";
import { User } from "../models/userModels.js";
export const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetched successfully! ",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in sneding doctoer details to frontend",
      error,
    });
  }
};

//profile updation
export const updateProfileController = async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log("profile update issue : ".error);
    res.status(500).send({
      success: false,
      message: "error updating profile",
      error,
    });
  }
};

// get doctor info for booking

export const getDoctorByIdController = async (req, res) => {
  try {
    // console.log("Request :", req.body);

    const doctor = await Doctor.findOne({ _id: req.body.doctorId });

    res.status(200).send({
      success: true,
      message: "Single Doc Info fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "failed getting doctor info",
      error,
    });
  }
};

export const doctorAppointmentController = async (req, res) => {
  try {
    console.log("REq ::", req.body);

    const doctor = await Doctor.findOne({ userId: req.body.userId });

    console.log("doctor", doctor);

    const appointments = await Appointment.find({
      doctorId: req.body.doctorId,
    });
    res.status(200).send({
      success: true,
      message: "Fetched successfully!",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Appointments fetching failed! ",
      error,
    });
  }
};

export const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await Appointment.findByIdAndUpdate(appointmentsId, {
      status,
    });
    const user = await User.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onClickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment status updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update status",
      error,
    });
  }
};
