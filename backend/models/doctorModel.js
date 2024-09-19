import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "first name is required!"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required!"],
    },
    phoneNo: {
      type: String,
      required: [true, "Phone number is required!"],
    },
    email: {
      type: String,
      required: [true, "email is required!"],
    },
    address: {
      type: String,
      required: [true, "address is required!"],
    },
    website: {
      type: String,
    },
    specialization: {
      type: String,
      required: [true, "specialization is required!"],
    },
    experience: {
      type: String,
      required: [true, "experience is required!"],
    },
    feesPerConsultation: {
      type: Number,
      required: [true, "Consultation fees is required!"],
    },
    status:{
      type: String,
      default: 'pending'
    },
    timing: {
      type: Object,
      required: [true, "work timing is required!"],
    },
  },
  {
    timestamps: true,
  }
);

export const Doctor = mongoose.model("Doctor", DoctorSchema);
