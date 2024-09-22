import React, { useState } from "react";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { Badge, ConfigProvider, message, Space } from "antd";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.user);


  const location = useLocation();
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfull!");
    navigate("/login");
  };

  // ***********************doctor menu**********************************

  const doctorMenu = [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      id: 2,
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-calendar-check",
    },
    {
      id: 3,
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-regular fa-user",
    },
  ];
  const sideBarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  // ***********************doctor menu**********************************

  return (
    <div className="main w-full h-screen flex flex-col">
      <div className="layout w-full h-screen flex p-5 justify-between gap-5 items-center bg-[#111018]">
        {/* sidebar */}
        <div
          className={` ${
            isOpen ? "block " : "hidden"
          }  bg-[#1A1A1A] w-3/4 sm:w-1/4 md:w-2/6 lg:w-1/4 lg:block h-full rounded-lg border border-[#2E2E2E] absolute sm:relative z-10`}
        >
          <div className="logo text-center flex items-center justify-around bg-[#292929] rounded-t-lg text-white text-2xl p-3 ]">
            <h1>DocSlot</h1>
            <button onClick={() => setIsOpen(false)} className="lg:hidden">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="menu text-2xl  font-body text-white pb-1 flex flex-col">
            {sideBarMenu.map(({ id, name, path, icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link key={id} to={path}>
                  <div
                    className={` flex items-center transition duration-100 ease-in cursor-pointer justify-start gap-4 p-2 hover:bg-[#D9FE95] hover:text-[#1A1A1A] rounded m-1 ${
                      isActive && "bg-[#D9FE95] text-[#1A1A1A]"
                    }`}
                  >
                    <i className={icon}></i>
                    {name}
                  </div>
                </Link>
              );
            })}
            <div
              className={` flex items-center cursor-pointer justify-start gap-4 p-2 hover:bg-[#D9FE95] hover:text-[#1A1A1A] rounded m-2`}
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>

        {/* main content  */}
        <div className="content flex flex-col gap-5 justify-center items-center w-full h-full ">
          <div className="header w-full h-16 rounded flex p-3 items-center justify-end ">
            <div className=" p-2 w-full flex items-center justify-between gap-8">
              {/* toggle hamburguer button  */}
              <div className=" flex items-center justify-center gap-1">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white text-xl lg:hidden focus:outline-none"
                >
                  <i className="fa fa-bars"></i> {/* Hamburger icon */}
                </button>
              </div>
              <span className=" flex justify-center items-center gap-5">
                <Space size="middle">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorText:"rgba(0, 0, 0, 0.88)"
                      },
                    }}
                  >
                    <Badge
                      color="#D9FE95"
                      dot={user && user.notification.length}
                      onClick={() => {
                        navigate("/get-all-notifications");
                      }}
                      className=" text-black  cursor-pointer"
                    >
                      <i className="fa-solid fa-bell text-white hover:bg-[#D9FE95] hover:text-[#1A1A1A] p-2 rounded transition duration-200 ease-linear"></i>
                    </Badge>
                  </ConfigProvider>
                </Space>
                <Link
                  to="/profile"
                  className="text-white capitalize hover:bg-[#D9FE95] hover:text-[#1A1A1A] p-2 rounded transition duration-200 ease-linear cursor-pointer"
                >
                  {user?.name}
                </Link>
              </span>
            </div>
          </div>
          <div className=" w-full h-full  rounded-md overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
