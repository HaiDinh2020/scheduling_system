import { Route, Routes } from "react-router-dom";
import { path } from "./ultils/constants";
import { Home, Login } from "./containers/Public";
import 'react-toastify/dist/ReactToastify.css';
import { Customer, Profile } from "./containers/System/Customer";
import { Garage, Profile as GarageProfile, Infor } from "./containers/System/Garage";

function App() {
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
          <Route path={path.GARAGEPROFILE} Component={GarageProfile} />
          <Route path={path.GARAGEINFO} Component={Infor} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;