import React from "react";
import Layout from "./Layout";
import { message, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";

const UnreadTabContent = ({ user, handleMarkAllRead }) => (
  <div className="bg-slate-500 h-full">
    {user?.notification.map((notificationMsg, index) => (
      <div
        className=" bg-slate-300 cursor-pointer"
        onClick={notificationMsg.onClickPath}
        key={index}
      >
        {notificationMsg.message}
      </div>
    ))}
    <div>
      <button
        className="bg-emerald-500 p-1 rounded"
        onClick={handleMarkAllRead}
      >
        Mark All Read
      </button>
    </div>
  </div>
);



const ReadTabContent = ({ user, handleDeleteAllRead }) => (
  <div className="bg-slate-500 h-full">
    {user?.seenNotification.map((notificationMsg, index) => (
      <div
        className=" bg-slate-300 cursor-pointer"
        onClick={notificationMsg.onClickPath}
        key={index}
      >
        {notificationMsg.message}
      </div>
    ))}
    <div>
      <button
        className="bg-emerald-500 p-1 rounded"
        onClick={handleDeleteAllRead}
      >
        Delete All Read
      </button>
    </div>
  </div>
);

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);


  
  // handling mark all notifications
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notifications",
        {
          userId: user._id,
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
        window.location.reload()
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong!");
    }
  };




  // handling delete notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user//delete-all-notifications",
        {
          userId: user._id,
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
        window.location.reload()
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong!");
    }
  };


  
  const tabItems = [
    {
      key: "0",
      label: "Unread",
      children: (
        <UnreadTabContent user={user} handleMarkAllRead={handleMarkAllRead} />
      ),
    },
    {
      key: "1",
      label: "Read",
      children: (
        <ReadTabContent user={user} handleDeleteAllRead={handleDeleteAllRead} />
      ),
    },
  ];

  return (
    <Layout>
      <div className=" w-full h-full rounded-md bg-amber-500">
        <h2 className=" text-3xl text-center p-2">Notifications</h2>
        <Tabs items={tabItems} />
      </div>
    </Layout>
  );
};

export default NotificationPage;
