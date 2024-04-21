import { Route, Routes, useNavigate } from "react-router-dom";
import { path } from "./ultils/constants";
import { Home, Login } from "./containers/Public";
import 'react-toastify/dist/ReactToastify.css';
import { Customer } from "./containers/System/Customer";
import { Garage, Infor } from "./containers/System/Garage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from './store/actions'
import Profile from "./containers/System/Profile";


function App() {

  const { isLoggedIn, role } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(actions.getCurrentProfile())
      if (role == 'garage') {
        dispatch(actions.getGarageInfor())
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
  }, [])

  return (
    <div className="h-full w-full bg-primary">
      <Routes>
        <Route path={path.HOME} Component={Home} >
          <Route path={path.LOGIN} Component={Login} />
        </Route>
        <Route path={path.CUSTOMER} Component={Customer}>
          <Route path={path.USERPROFILE} Component={Profile} />
        </Route>
        <Route path={path.GARAGE} Component={Garage}>
          <Route path={path.GARAGEPROFILE} Component={Profile} />
          <Route path={path.GARAGEINFO} Component={Infor} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;