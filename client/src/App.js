import { Route, Routes } from "react-router-dom";
import { path } from "./ultils/constants";
import { Home, Login } from "./containers/Public";
import 'react-toastify/dist/ReactToastify.css';
import { Customer, Profile } from "./containers/System/Customer";

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
      </Routes>
    </div>
  );
}

export default App;