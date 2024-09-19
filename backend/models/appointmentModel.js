import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  doctorInfo: {
    type: String,
    required: true,
  },
  userInfo: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  time: {
    type: String,
    required: true,
  },
},{
    timestamps:true
});

export const Appointment = mongoose.model("Appointment", AppointmentSchema)