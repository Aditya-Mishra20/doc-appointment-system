import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {ConfigProvider, message, Table } from "antd";
import axios from "axios";

const Appointments = () => {
  const [appointmentList, setAppointmentList] = useState([]);

  const getAppointmentList = async () => {
    try {
      const res = await axios.get("https://doc-appointment-system-backend.vercel.app/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointmentList(res.data.data);
      }
    } catch (error) {
      console.error(error);
      message.error(res.data.message);
    }
  };

  useEffect(() => {
    getAppointmentList();
  }, []);

  const column = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        <span>
          {`${record.doctorId.firstName} ${record.doctorId.lastName}`}
        </span>;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNo",
      render: (text, record) => {
        <span>{record.doctorId.phoneNo}</span>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
            <h1 className=" text-start text-white text-3xl m-3 mb-6 ">
        Appointments
      </h1>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#17161C",
              headerColor: "#fafafa",
              rowHoverBg: "#292929",
            },
          },
        }}
      >
        <Table
          rowClassName={() =>
            " text-white font-sans bg-[#17161C] text-sm sm:text-base md:text-lg"
          } // Tailwind row styling
          scroll={{
            x: 1000, // Set horizontal scrolling width (px)
            y: 300, // Set vertical scrollable height (px)
          }}
          pagination={false}
          columns={column}
          dataSource={appointmentList}
        />
      </ConfigProvider>
    </Layout>
  );
};

export default Appointments;
