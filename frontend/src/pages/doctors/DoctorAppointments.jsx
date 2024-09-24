import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { ConfigProvider, message, Table } from "antd";

const DoctorAppointments = () => {
  const [appointmentList, setAppointmentList] = useState([]);

  const getAppointmentList = async () => {
    try {
      const res = await axios.get("https://doc-appointment-system-backend.vercel.app/api/v1/doctor/doctor-appointments", {
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

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "https://doc-appointment-system-backend.vercel.app/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointmentList();
      }
    } catch (error) {
      console.error(error);
      message.error("something went wrong");
    }
  };

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
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div>
          {record.status === "pending" && (
            <div className=" flex gap-1 justify-center items-center">
              <button
                className=" rounded p-2 text-white bg-lime-500"
                onClick={() => handleStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className=" rounded p-2 text-white bg-red-500"
                onClick={() => handleStatus(record, "rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className=" text-white text-start text-3xl m-3 mb-6">Appointments</h1>
      <div className="m-2">
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
              "text-white font-sans bg-[#17161C] text-sm sm:text-base md:text-lg"
            }
            scroll={{
              x: 1000, // Set horizontal scrolling width (px)
              y: 400, // Set vertical scrollable height (px)
            }}
            columns={column}
            pagination={false}
            dataSource={appointmentList}
          />
        </ConfigProvider>
      </div>
    </Layout>
  );
};

export default DoctorAppointments;
