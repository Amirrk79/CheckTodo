import React from "react";
import { Redirect, Route } from "react-router-dom";
import { mainMenu } from "../components/routepaths";

function ProtectedLogin({ component: Component, path, ...rest }) {
  const name = localStorage.getItem("name");
  let isLoggedIn = false;
  function setIsloggedIn() {
    if (!name) {
      isLoggedIn = false;
    } else {
      isLoggedIn = true;
    }
  }

  setIsloggedIn();

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return isLoggedIn ? (
          <Redirect to={mainMenu} />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
}

export default ProtectedLogin;
