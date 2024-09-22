import { User } from "../models/userModels.js";
import { Doctor } from "../models/doctorModel.js";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      success: true,
      message: "users retrival successful!",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: " error while getting users",
      error,
    });
  }
};
export const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      success: true,
      message: "Doctors retrival successful!",
      data: doctors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: " error while getting doctors",
      error,
    });
  }
};

// doctor account status
export const changeAccountStatusController = async (req, res) => {
  

  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, { status },{ new: true });

    const user = await User.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Request has been ${status}.`,
      onClickPath: "/notification",
    });
    user.isDoctor = doctor.status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated.",
      data: doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "error in changing account status",
      error,
    });
  }
};
