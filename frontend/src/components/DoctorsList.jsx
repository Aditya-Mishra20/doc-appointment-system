import React from "react";
// import { Card, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
const DoctorsList = ({ doctors }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-64 rounded-lg m-4 bg-transparent p-4 text-center shadow-[5px_5px_10px_#09090b,-5px_-5px_10px_#25232d] dark:bg-[#17161C]">
        <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#c8ff61] dark:bg-[#b8e565]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="currentColor"
            className="bi bi-person-fill text-white dark:text-[#DAFF96]"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
          </svg>
          <figcaption className="sr-only">{`Dr. ${doctors.firstName} ${doctors.lastName}`}</figcaption>
        </figure>
        <h2 className="mt-4 font-sans text-xl font-bold  dark:text-white">
          {`Dr. ${doctors.firstName} ${doctors.lastName}`}
        </h2>
        <p className="mb-4 font-sans text-gray-600 dark:text-gray-300">{`${doctors.specialization.toUpperCase()}`}</p>
        <div className=" m-2">⭐⭐⭐⭐⭐</div>
        <div className="flex items-center justify-center gap-2">
          <Link
            to={`/doctor/book-appointment/${doctors._id}`}  
            className="rounded-full font-sans hover:text-[#1A1A1A] transition duration-100 ease-in-out px-4 py-2 text-white border-2 border-[#2E2E2E] hover:bg-[#DAFF96]"
          >
            Book
          </Link>
          <Link
            to={`#`}
            className="rounded-full font-sans hover:text-[#1A1A1A] transition duration-100 ease-in-out px-4 py-2 text-white border-2 border-[#2E2E2E] hover:bg-[#DAFF96]"
          >
            Portfolio
          </Link>
        </div>
      </div>
    </>
  );
};

export default DoctorsList;
