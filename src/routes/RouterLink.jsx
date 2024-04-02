import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import Const from "../constant";

//------------ pages
import Home from "../page/home/Home";
import LoginPageMobile from "../page/home/LoginPageMobile";
import RegisterStep1 from "../page/home/RegisterStep1";
import RegisterStep2 from "../page/home/RegisterStep2";


function RouterLink() {

  return (
    <>
      <Router>
        <Switch>
          <PublicRoute exact path={Const.HOME} component={Home} />
          <PublicRoute exact path={Const.PAGE_LOGIN_MOBILE} component={LoginPageMobile} />
          <PublicRoute exact path={Const.PAGE_REGISTER_STEP1} component={RegisterStep1} />
          <PublicRoute exact path={Const.PAGE_REGISTER_STEP2} component={RegisterStep2} />
          <Route
            render={({ location, history }) => (
              <React.Fragment>
                <>
                  {/* <PrivateRoute exact path={Const.HOME} component={Home} /> */}
                </>
              </React.Fragment>
            )}
          />
        </Switch>
      </Router>
    </>
  );
}

export default RouterLink;
