import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

// const auth = localStorage.getItem("token");
// console.log(auth, "auth state")

const PrivateRoute = ({ exact, component: Component, ...rest }) => {
  const { user} = useAuthContext();
  console.log(process.env.PUBLIC_URL);

  return(
  <Route
    exact={exact ? true : false}
    rest
    render={(props) =>
      user ? (
        <Component {...props} {...rest}></Component>
      ) : (
        <Redirect to={`/auth-login`}></Redirect>
      )
    }
  ></Route>)
  };

export default PrivateRoute;
