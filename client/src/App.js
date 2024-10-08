import { Route, Routes, useNavigate } from "react-router-dom";
import { path } from "./ultils/constants";
import { Home, Login } from "./containers/Public";
import 'react-toastify/dist/ReactToastify.css';
import { Booking, BookingHistory, BookingMaintenance, BookingRepair, Customer, ListCars, PaymentResult } from "./containers/System/Customer";
import { Dashboard, Garage, Infor, Schedule, Statistics, Task } from "./containers/System/Garage";
import { Mechanic, WorkSchedule, ViewTask } from "./containers/System/Mechanic"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from './store/actions'
import Profile from "./containers/System/Profile";
import Chat from "./containers/System/Chat/Chat";
import socketIOClient from "socket.io-client";
import Notification from "./components/Notification";

const URL = process.env.NODE_ENV === 'production' ? undefined : `${process.env.REACT_APP_SERVER_URL}/booking`;

function App() {

  const { isLoggedIn, role } = useSelector(state => state.auth)
  const userId = useSelector(state => state.user?.userCurentProfile?.id)
  const garageId = useSelector((state) => state.garage.garageInfor.id);
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const [socket, setSocket] = useState(null);


  // kết nói socket server
  useEffect(() => {
    const newSoket = socketIOClient.connect(URL)
    setSocket(newSoket)

    return () => newSoket.disconnect()
  }, [])

  // thêm user online
  useEffect(() => {
    if (isLoggedIn) {
      socket?.emit("addUser", userId);
    }
  }, [isLoggedIn, socket, userId]);

  useEffect(() => {
    if (socket) {
      socket.on("booking_request", (bookingDetail) => {
        console.log(22222);
        console.log(bookingDetail);
        dispatch(actions.addBooking(bookingDetail))
      });

      return () => {
        socket.off("booking_request");
      };
    }
  }, [socket]);

  useEffect(() => {
    dispatch(actions.getAllGarage())
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(actions.getCurrentProfile())
      if (role === 'garage') {
        dispatch(actions.getGarageInfor())
      } else {
        dispatch(actions.getAllCar())
        dispatch(actions.getAllBookingCustomer())
      }
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      if (role === 'garage') {
        dispatch(actions.getAllMechanic(garageId))
      }
    }
  }, [garageId, isLoggedIn, role])

  useEffect(() => {
    if (isLoggedIn) {
      if (role === 'garage') {
        navigate("/garage")
      } else if (role === 'mechanic') {
        navigate("/mechanic")
      }
    } else {
      navigate("/login")
    }
  }, [])

  return (
    <div className="h-full w-full min-h-screen bg-primary">
      <Notification />
      <Routes>
        <Route path={path.HOME} Component={Home} >
          <Route path={path.LOGIN} Component={Login} />
          <Route path={path.SERVICES} element={<Booking socket={socket} />} >
          </Route>
          <Route path={path.REPAIR} element={ <BookingRepair socket={socket} />} />
          <Route path={path.MAINTENANCE} Component={BookingMaintenance} />
        </Route>
        <Route path={path.CUSTOMER} Component={Customer}>
          <Route path={path.USERPROFILE} Component={Profile} />
          <Route path={path.List_CARS} Component={ListCars} />
          <Route path={path.BOOKING_HISTORY} Component={BookingHistory} />
          <Route path={path.PAYMENTRESULT} Component={PaymentResult} />
        </Route>
        <Route path={path.GARAGE} Component={Garage}>
          <Route path={path.GARAGEPROFILE} Component={Profile} />
          <Route path={path.GARAGEINFO} Component={Infor} />
          <Route path={path.GARAGESCHEDULE} element={<Schedule socket={socket} />} />
          <Route path={path.GARAGETASK} element={<Task />} />
          <Route path={path.GARAGESTAT} element={<Statistics />} />
        </Route>
        <Route path={path.GARAGE_DASHBOARD} Component={Dashboard} />

        <Route path={path.MECHANIC} Component={Mechanic}>
          <Route path={path.MECHANICPROFILE} Component={Profile} />
          <Route path={path.MECHANICWORKSCHEDULE} element={<WorkSchedule />} />
          <Route path={path.MECHANICTASK} element={<ViewTask />} />
        </Route>
        <Route path={path.SYSTEM} >
          <Route path={path.MESSAGE} Component={Chat} />
        </Route>
        <Route path="*" element={<>hello otocare</>} />
      </Routes>

    </div>
  );
}

export default App;