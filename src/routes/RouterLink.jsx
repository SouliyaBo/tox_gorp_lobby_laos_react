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
import PlayBackOffice from "../page/home/PlayBackOffice";
import LoginPageMobile from "../page/home/LoginPageMobile";
import RegisterStep1 from "../page/home/RegisterStep1";
import RegisterStep2 from "../page/home/RegisterStep2";
import AfterLogin from "../page/lobby/AfterLogin";
import AfterLoginMobile from "../page/lobby/AfterLoginMobile";
// import GameList from "../page/lobby/GameList";
import AfterLoginMobileAllGame from "../page/lobby/AfterLoginMobileAllGame";


function RouterLink() {
  return (
    <>
      <Router>
        <Switch>
          <PublicRoute exact path={Const.PAGE_LOGIN_MOBILE} component={LoginPageMobile} />
          <PublicRoute exact path={Const.AFFILIATE} component={RegisterStep1} />
          {/* <PublicRoute exact path={Const.PAGE_LOGIN_CAN_LOGIN_PLAY + "/:token"} component={Home} /> */}
          <PublicRoute exact path={Const.PAGE_REGISTER_STEP1} component={RegisterStep1} />
          <PublicRoute exact path={Const.PAGE_REGISTER_STEP2} component={RegisterStep2} />
          <PublicRoute exact path={Const.PAGE_LOGIN_CAN_LOGIN_PLAY + "/:token"} component={AfterLogin} />

          <Route
            render={({ location, history }) => (
              <React.Fragment>
                <>
                  <PrivateRoute exact path={Const.AFTER_LOGIN} component={AfterLogin} />
                  <PrivateRoute exact path={Const.AFTER_LOGIN_MOBILE} component={AfterLoginMobile} />
                  {/* <PrivateRoute exact path={Const.GAME_LIST} component={GameList} /> */}
                  <PrivateRoute exact path={Const.GAME_LIST_MOBILE} component={AfterLoginMobileAllGame} />
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
