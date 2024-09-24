import React from "react";
import Layout from "../components/Layout";
import {
  Col,
  ConfigProvider,
  Form,
  Input,
  message,
  Row,
  TimePicker,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.error(user);

  //handle form
  const handleFinish = async (values) => {
    console.error(values);
    const time = values.timing.map((ts) => new Date(ts));

    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://doc-appointment-system-backend.vercel.app/api/v1/user/apply-doctor",
        {
          ...values,
          userId: user._id,
          timing: time,
        },
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
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error("Something went wrong!");
    }
  };
  return (
    <Layout>
      <h1 className="  text-start text-white text-3xl m-3 mb-6 ">
        Apply Doctor
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
          <Form
            layout="vertical"
            onFinish={handleFinish}
            className=" text-white p-5"
          >
            <h5 className="font-sans border-b text-[#6c6c6c] border-b-slate-500 pb-2 text-2xl m-2">
              Personal Details
            </h5>
            <Row gutter={20}>
              <Col xs={24} md={8} lg={8}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter First Name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8} lg={8}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter Last Name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8} lg={8}>
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
              <Col xs={24} md={8} lg={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="email" placeholder="Enter Your Email" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8} lg={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter Your Address" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8} lg={8}>
                <Form.Item label="Website" name="website">
                  <Input type="text" placeholder="Your Website" />
                </Form.Item>
              </Col>
            </Row>
            <h5 className="font-sans border-b text-[#6c6c6c] border-b-slate-500 pb-2 text-2xl m-2">
              Professional Details
            </h5>
            <Row gutter={20}>
              <Col xs={24} md={8} lg={8}>
                <Form.Item
                  label=" Specialization"
                  name="specialization"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter Specialization" />
                </Form.Item>
              </Col>
              <Col xs={24} md={8} lg={8}>
                <Form.Item
                  label="Experience"
                  name="experience"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Your Experience" />
                </Form.Item>
              </Col>
              <Col xs={24} md={8} lg={8}>
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
              <Col xs={24} md={8} lg={8}>
                <Form.Item label="Time" name="timing" required>
                  <TimePicker.RangePicker format="HH:mm A" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}></Col>
              <div className=" flex justify-center ml-5 items-center">
                <button
                  type="submit"
                  className="rounded-full font-sans hover:text-[#1A1A1A] transition duration-200 ease-in-out px-4 py-2 text-white border-2 border-white hover:bg-[#DAFF96] hover:border-[#DAFF96]"
                >
                  Submit
                </button>
              </div>
            </Row>
          </Form>
        </ConfigProvider>
      </div>
    </Layout>
  );
};

export default ApplyDoctor;
