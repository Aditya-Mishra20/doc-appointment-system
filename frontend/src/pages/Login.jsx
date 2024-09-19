import React from "react";
import { Button, Form, Input, message } from "antd";
import { Card } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successful!");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
      window.location.reload();
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen w-full">
      <Card
        title="Login Form"
        bordered={false}
        className="text-center w-96  border-2"
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
              Login
            </Button>
          </Form.Item>
        </Form>
        <h1>
          New here?{" "}
          <NavLink to="/register" className=" text-blue-500">
            Register here
          </NavLink>
        </h1>
      </Card>
    </div>
  );
};

export default Login;
