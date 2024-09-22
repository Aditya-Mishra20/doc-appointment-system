import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  Col,
  ConfigProvider,
  Form,
  Input,
  message,
  Row,
  TimePicker,
} from "antd";
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
      <h1 className="  text-start text-white text-3xl m-3 mb-6 ">
        Manage Profile
      </h1>

      <div className="bg-[#1A1A1A] overflow-auto shadow-[22px_22px_44px_#25232d,-22px_-22px_44px_#09090b] rounded-3xl m-5">
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "sans-serif",
            },
            components: {
              Form: {
                labelColor: "#fafafa",
                labelFontSize: 20,
              },
            },
          }}
        >
          {doctorInfo && (
            <Form
              layout="vertical"
              onFinish={handleFinish}
              className=" text-white p-5"
              // form={form}
            >
              <h5 className="font-sans border-b text-[#6c6c6c] border-b-slate-500 pb-2 text-2xl m-2">
                Personal Details:
              </h5>
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
              <h5 className="font-sans border-b text-[#6c6c6c] border-b-slate-500 pb-2 text-2xl m-2">
                Personal Details:
              </h5>
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
                    className="rounded-full font-sans hover:text-[#1A1A1A] transition duration-200 ease-in-out px-4 py-2 text-white border-2 border-white hover:bg-[#DAFF96] hover:border-[#DAFF96]"
                  >
                    Submit
                  </button>
                </Col>
              </Row>
            </Form>
          )}
        </ConfigProvider>
      </div>
    </Layout>
  );
};

export default Profile;
