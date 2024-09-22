import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import DoctorsList from "../components/DoctorsList";
import { Row } from "antd";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "https://docslot-doctor-appointment-system-backend.vercel.app/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getAllDoctorsList = async () => {
    try {
      const res = await axios.get("https://docslot-doctor-appointment-system-backend.vercel.app/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
    getAllDoctorsList();
  }, []);
  return (
    <Layout>
      <h1 className=" text-start  text-white text-3xl m-3 ">Doctors</h1>
      <div className="grid gap-6 justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {doctors &&
          doctors.map((doctors, index) => (
            <DoctorsList key={index} doctors={doctors} />
          ))}
      </div>
    </Layout>
  );
};

export default HomePage;
