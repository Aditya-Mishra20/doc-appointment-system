import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { message, Table } from "antd";
import axios from "axios";


const Appointments = () => {
  const [appointmentList, setAppointmentList] = useState([]);

  const getAppointmentList = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointmentList(res.data.data);
        console.log(res.data.data)
      }
    } catch (error) {
      console.log(error);
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
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => {
    //     <span>
    //       {`${record.doctorId.firstName} ${record.doctorId.lastName}`}
    //     </span>;
    //   },
    // },
    // {
    //   title: "Phone Number",
    //   dataIndex: "phoneNo",
    //   render: (text, record) => {
    //     <span>{record.doctorId.phoneNo}</span>;
    //   },
    // },
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
      appointment
      <div>
        <Table columns={column} dataSource={appointmentList} />
      </div>
    </Layout>
  );
};

export default Appointments;
