import { Route, Routes, useNavigate } from "react-router-dom";
import { path } from "./ultils/constants";
import { DetailGarage, Home, HomePage, Login } from "./containers/Public";
import 'react-toastify/dist/ReactToastify.css';
import { BookingHistory, Customer, ListCars } from "./containers/System/Customer";
import { Garage, Infor, Schedule } from "./containers/System/Garage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from './store/actions'
import Profile from "./containers/System/Profile";
import axios from "axios";


function App() {

  const { isLoggedIn, role } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // const setCookie = async () => {
  //   try {
  //     await axios.get('http://localhost:5000/set-cookie');
  //     console.log('Cookie set successfully');
  //   } catch (error) {
  //     console.error('Error setting cookie:', error);
  //   }
  // };

  useEffect(() => {
    dispatch(actions.getAllGarage())
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(actions.getCurrentProfile())
      if (role == 'garage') {
        dispatch(actions.getGarageInfor())
      } else {
        dispatch(actions.getAllCar())
        dispatch(actions.getAllBookingCustomer())
      }
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      if (role == 'garage') {
        navigate("/garage")
      }
    } else {
      navigate("/login")
    }
    // setCookie()
  }, [])

  return (
    <div className="h-full w-full bg-primary">
      <Routes>
        <Route path={path.HOME} Component={Home} >
          <Route path='*' element={<HomePage />} />
          <Route path={path.GARAGE_DETAIL} Component={DetailGarage} />
          <Route path={path.LOGIN} Component={Login} />
        </Route>
        <Route path={path.CUSTOMER} Component={Customer}>
          <Route path={path.USERPROFILE} Component={Profile} />
          <Route path={path.List_CARS} Component={ListCars} />
          <Route path={path.BOOKING_HISTORY} Component={BookingHistory} />
        </Route>
        <Route path={path.GARAGE} Component={Garage}>
          <Route path={path.GARAGEPROFILE} Component={Profile} />
          <Route path={path.GARAGEINFO} Component={Infor} />
          <Route path={path.GARAGESCHEDULE} Component={Schedule} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;