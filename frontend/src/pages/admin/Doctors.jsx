import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { ConfigProvider, message, Table } from "antd";
import axios from "axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.error(error);
      message.error("Error while fetching doctor list.");
    }
  };

  //   handle Account Status
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        {
          doctorId: record._id,
          userId: record.Id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        res.data.data;
      }
    } catch (error) {
      console.error(error);
      message.error("error handling account status");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const column = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>{`${record.firstName} ${record.lastName}`}</span>
      ),
    },
    {
      title: "Phone No.",
      dataIndex: "phoneNo",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
    },
    {
      title: "Experience",
      dataIndex: "experience",
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
          {record.status === "pending" ? (
            <button
              className=" p-2 rounded bg-green-500 text-white"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className=" p-2 bg-red-500 text-white">Reject</button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className=" text-center text-white text-3xl m-3 ">Doctors List</h1>
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
          dataSource={doctors}
        />
      </ConfigProvider>
    </Layout>
  );
};

export default Doctors;
