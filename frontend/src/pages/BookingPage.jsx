import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  message,
  Row,
  TimePicker,
} from "antd";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const params = useParams();
  const docId = params.doctorId;

  const getDocInfo = async () => {
    try {
      const res = await axios.post(
        "https://docslot-doctor-appointment-system-backend.vercel.app/api/v1/doctor/getDoctorById",
        {
          doctorId: docId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //   ***************** handleBooking ***********************

  const handleBooking = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://docslot-doctor-appointment-system-backend.vercel.app/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
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
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("error in book appointment :", error);
    }
  };

  //   ***************** handleBooking ends ***********************

  //   ***************** handleAvailability  ***********************

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://docslot-doctor-appointment-system-backend.vercel.app/api/v1/user/booking-availability",
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
    }
  };

  //   ***************** handleAvailability ends  ***********************
  useEffect(() => {
    getDocInfo();
  }, []);
  return (
    <Layout>
      <h1 className=" text-3xl text-white text-start m-4">Book Appointment</h1>
      <div className="flex flex-col bg-[#1A1A1A] ml-3 mr-3 shadow-[22px_22px_44px_#25232d,-22px_-22px_44px_#09090b] rounded-3xl">
        <div className="px-6 py-8 sm:p-10 sm:pb-6">
          {doctor && (
            <>
              <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                <div>
                  <h2 className="text-xl font-medium tracking-tighter text-white lg:text-3xl">
                    {`Dr. ${doctor.firstName} ${doctor.lastName}`}
                  </h2>
                  <p className="mt-2 text-sm text-gray-100">{`A ${doctor.specialization} with remarkable experience of ${doctor.experience} years.`}</p>
                </div>

                <div className="mt-6">
                  <p className="text-2xl font-light tracking-tight pb-4 text-white">{` Available at ${moment(
                    doctor.timing[0]
                  ).format("hh:mm A")} - ${moment(doctor.timing[1]).format(
                    "hh:mm A"
                  )}`}</p>
                  <p>
                    <span className="text-5xl font-light tracking-tight text-white">
                      {`₹${doctor.feesPerConsultation}`}
                    </span>
                    <span className="text-base font-medium text-white">
                      {" "}
                      / session{" "}
                    </span>
                  </p>
                </div>
              </div>
              <div className=" flex  mt-5 ">
                <ConfigProvider
                  theme={{
                    token: {
                      fontFamily: "sans-serif",
                    },
                    components: {
                      Form: {
                        labelColor: "#fafafa",
                        labelFontSize: 20,
                      },
                      DatePicker: {},
                    },
                  }}
                >
                  <Form
                    layout="vertical"
                    onFinish={handleBooking}
                    className=" "
                  >
                    <Row gutter={20} className="flex items-center">
                      <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Date" name="date">
                          <DatePicker
                            format="DD-MM-YYYY"
                            onChange={(values) => {
                              setDate(
                                moment(new Date(values)).format("DD-MM-YYYY")
                              );
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Time" name="time">
                          <TimePicker
                            format="HH:mm A"
                            onChange={(values) => {
                              const fromTime = new Date(doctor?.timing[0])
                                .toISOString()
                                .slice(11, 19);
                              const toTime = new Date(doctor?.timing[1])
                                .toISOString()
                                .slice(11, 19);
                              const requestedTime = moment(new Date(values))
                                .toISOString()
                                .slice(11, 19);
                              if (
                                !(
                                  fromTime <= requestedTime &&
                                  requestedTime <= toTime
                                )
                              ) {
                                message.error("Out of Range");
                              } else {
                                setTime(moment(new Date(values)));
                              }
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                        <button
                          onClick={handleAvailability}
                          className="rounded-full font-sans hover:text-[#1A1A1A] transition duration-200 ease-in-out px-4 py-2 text-white border-2 border-white hover:bg-[#DAFF96] hover:border-[#DAFF96]"
                        >
                          Check Availability
                        </button>
                      </Col>

                      <Col xs={24} md={24} lg={8}>
                        <button
                          type="submit"
                          className=" rounded-full font-sans hover:text-[#1A1A1A] transition duration-200 ease-in-out px-4 py-2 text-white border-2 border-white hover:bg-[#DAFF96] mt-6 hover:border-[#DAFF96]"
                        >
                          Book Now
                        </button>
                      </Col>
                    </Row>
                  </Form>
                </ConfigProvider>
              </div>
            </>
          )}
        </div>

        {/* appointment booking form  */}
        {/* {doctor && (
          <div className=" flex flex-col justify-center bg-orange-300 items-start p-4 m-4">
            
          </div>
        )} */}
      </div>
    </Layout>
  );
};

export default BookingPage;
