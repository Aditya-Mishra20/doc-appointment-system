import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { ConfigProvider, message, Table, Tag } from "antd";
import axios from "axios";
const Users = () => {
  const [users, setUsers] = useState([]);

  //get users
  const getUsers = async () => {
    try {
      const res = await axios.get("https://doc-appointment-system-backend.vercel.app/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error(error);
      message.error("error displaying users");
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const column = [
    {
      title: "Name",
      dataIndex: "name", // same as in database
    },
    {
      title: "Email",
      dataIndex: "email", // same as in database
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => (
        <div>
          {record.isAdmin && <Tag color={"green"}>Admin</Tag>}
          {record.isDoctor && <Tag color={"purple"}>Doctor</Tag>}
          {!record.isAdmin && !record.isDoctor && (
            <Tag color={"geekblue"}>User</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions", // same as in database
      render: (text, record) => (
        <div>
          <button className=" text-red-500 rounded border border-red-500 p-2">
            Block
          </button>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className=" text-start text-white text-3xl m-3 mb-6 ">Users List</h1>
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
          dataSource={users}
        />
      </ConfigProvider>
    </Layout>
  );
};

export default Users;
