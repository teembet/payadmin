import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

// const auth = localStorage.getItem("token");
// console.log(auth, "auth state")

const PrivateRoute = ({ exact, component: Component, ...rest }) => {
  const { user} = useAuthContext();
  // console.log(isAuthenticated, user);

  return(
  <Route
    exact={exact ? true : false}
    rest
    render={(props) =>
      user ? (
        <Component {...props} {...rest}></Component>
      ) : (
        <Redirect to={`${process.env.PUBLIC_URL}/auth-login`}></Redirect>
      )
    }
  ></Route>)
  };

export default PrivateRoute;
