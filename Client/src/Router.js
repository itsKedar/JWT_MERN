import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AuthContext from "./context/AuthContext";
import Customer from "./components/Customer";
import CustomNav from "./components/CustomNav";
export default function Router() {
  const { LoggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <CustomNav />
      <Switch>
        <Route exact path='/'>
          <div className='d-flex justify-content-center'>Home</div>
        </Route>
        {LoggedIn === false && (
          <>
            <Route path='/register'>
              <div>
                <Register />
              </div>
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
          </>
        )}
        {LoggedIn === true && (
          <>
            <Route path='/customer'>
              <Customer />
            </Route>
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}
