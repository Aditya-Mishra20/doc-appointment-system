import React from "react";
import Layout from "./Layout";
import { ConfigProvider, message, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";

const UnreadTabContent = ({ user, handleMarkAllRead }) => (
  <>
    <div className="mb-2">
      <button
        className="rounded-full font-sans hover:text-[#1A1A1A] transition duration-100 ease-in-out px-4 py-2 text-white border-2 border-[#2E2E2E] hover:bg-[#DAFF96]"
        onClick={handleMarkAllRead}
      >
        Mark All Read
      </button>
    </div>
    <div className="flex items-center overflow-auto flex-col p-2 gap-2 w-full h-[60vh] ">
      {user?.notification.map((notificationMsg, index) => (
        // <div
        //   className=" bg-slate-300 cursor-pointer"
        //   onClick={notificationMsg.onClickPath}
        //   key={index}
        // >
        //   {notificationMsg.message}
        // </div>
        <div class=" font-sans cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]">
          <div class="flex items-center gap-2">
            <div class="text-[#DAFF96] flex  items-center justify-center bg-white/5 backdrop-blur-xl p-1 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
                class="w-6 h-6 shadow-[#1c569e]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                ></path>
              </svg>
            </div>
            <div className="text-white" key={index}>
              {notificationMsg.message}
            </div>
          </div>
          <button class="text-gray-600 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      ))}
    </div>
  </>
);

const ReadTabContent = ({ user, handleDeleteAllRead }) => (
  <>
    <div className="mb-2">
      <button
        className="rounded-full font-sans hover:text-[#1A1A1A] transition duration-100 ease-in-out px-4 py-2 text-white border-2 border-[#2E2E2E] hover:bg-[#DAFF96]"
        onClick={handleDeleteAllRead}
      >
        Delete All
      </button>
    </div>
    <div className="flex items-center overflow-auto flex-col p-2 gap-2 w-full h-[60vh] ">
      {user?.seenNotification.map((notificationMsg, index) => (
        <div class=" font-sans cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]">
          <div class="flex items-center gap-2">
            <div class="text-[#DAFF96] flex  items-center justify-center bg-white/5 backdrop-blur-xl p-1 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
                class="w-6 h-6 shadow-[#1c569e]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                ></path>
              </svg>
            </div>
            <div className="text-white" key={index}>
              {notificationMsg.message}
            </div>
          </div>
          <button class="text-gray-600 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      ))}
    </div>
  </>
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
        "https://doc-appointment-system-backend.vercel.app/api/v1/user/get-all-notifications",
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
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error("Something went wrong!");
    }
  };

  // handling delete notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://doc-appointment-system-backend.vercel.app/api/v1/user//delete-all-notifications",
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
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
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
      <h2 className=" text-3xl text-white text-center p-2">Notifications</h2>
      <ConfigProvider
        theme={{
          theme: {},
          components: {
            Tabs: {
              itemColor: "#fafafa",
              itemActiveColor: "#DAFF96",
              itemSelectedColor: "#DAFF96",
              inkBarColor: "#DAFF96",
              itemHoverColor: "#DAFF96",
            },
          },
        }}
      >
        <Tabs items={tabItems} />
      </ConfigProvider>
    </Layout>
  );
};

export default NotificationPage;
