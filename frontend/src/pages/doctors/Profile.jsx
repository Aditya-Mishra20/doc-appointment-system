import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Col, Form, Input, message, Row, TimePicker } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/alertSlice.js";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctorInfo, setDoctorInfo] = useState(null);
  // const [form] = Form.useForm();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ********************** update doctor profile *************************
  //handle form
  const handleFinish = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong!");
    }
  };
  // ********************** update doctor profile *************************

  //get doctor information
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        {
          userId: params.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success("Doctor Info fetched Successfully!");
        setDoctorInfo(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Unable to get Info");
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  // useEffect(() => {
  //   if (doctorInfo) {
  //     // Populate the form with the fetched data
  //     form.setFieldsValue(doctorInfo);
  //   }
  // }, [doctorInfo, form]);

  return (
    <Layout>
      <div className=" w-full h-full rounded-md p-4 overflow-scroll ">
        <div className=" flex justify-center items-center m-2">
          <h1 className=" text-3xl">Manage Profile</h1>
        </div>
        {doctorInfo && (
          <Form
            layout="vertical"
            onFinish={handleFinish}
            className=" p-3 border-2"
            // form={form}
          >
            <h5 className=" text-2xl m-2">Personal Details:</h5>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter First Name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter Last Name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Contact Number"
                  name="phoneNo"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter Phone Number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="email" placeholder="Enter Your Email" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter Your Address" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Website"
                  name="website"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Your Website" />
                </Form.Item>
              </Col>
            </Row>
            <h5 className=" text-2xl m-2">Personal Details:</h5>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label=" Specialization"
                  name="specialization"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter Specialization" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Experience"
                  name="experience"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Your Experience" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Consult Fee"
                  name="feesPerConsultation"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Your Charges" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Time" name="timing" required>
                  <TimePicker.RangePicker format="HH:mm" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}></Col>
              <Col xs={24} md={24} lg={8}>
                <button
                  type="submit"
                  className=" bg-teal-500 p-2 mt-6 rounded text-white"
                >
                  Submit
                </button>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
