import { Route, Routes } from "react-router-dom";
import { path } from "./ultils/constants";
import { Home, Login } from "./containers/Public";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="h-screen w-full bg-primary">
      <Routes>
        <Route path={path.HOME} Component={Home} >
          <Route path={path.LOGIN} Component={Login} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;