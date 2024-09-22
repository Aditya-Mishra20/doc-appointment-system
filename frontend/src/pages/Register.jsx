import React from "react";
import { Button, Form, Input, message } from "antd";
import { Card } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        message.success("Registered Successfully!!!");
        navigate("/");
      } else {
        message.error(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error("Something went wrong!");
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen w-full">
      <Card
        title="Register Form"
        bordered={false}
        className=" text-center w-96  border-2"
      >
        <Form
          layout="vertical"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishHandler}
          autoComplete="on"
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[
              {
                required: true,
                message: "Enter your username",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Enter your email.",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        <h1>
          Already registered?{" "}
          <NavLink to="/login" className=" text-blue-500">
            Login here
          </NavLink>
        </h1>
      </Card>
    </div>
  );
};

export default Register;
