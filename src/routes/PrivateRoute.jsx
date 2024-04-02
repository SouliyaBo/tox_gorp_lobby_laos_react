import React from "react";
import { Route } from "react-router-dom";
// import { useAuth } from "../helpers/user";
// import { useHistory } from "react-router-dom";
function PrivateRoute({ component: Component, headerTitle, ...rest }) {
  // const History = useHistory();
  // const isAuthenticated = useAuth();
  // console.log(getUserDataFromLCStorage);
  // if (!isAuthenticated) {
  //   History.push("/");
  //   return <div></div>;
  // } else {
  //   // console.log(isAuthenticated);
  //   return (
  //     <Route
  //       {...rest}
  //       render={(props) => (
  //         <div>
  //           <Component {...props} />
  //         </div>
  //       )}
  //     />
  //   );
  // }
}

export default PrivateRoute;
