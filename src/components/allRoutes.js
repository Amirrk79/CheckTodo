import React from "react";
import { Switch, Route } from "react-router-dom";
import MainMenu from "../pages/mainMenu/mainMenu";
import Login from "../pages/login/login";
import Completed from "../pages/completed/completed";
import UnCompleted from "../pages/not completed/nunCompleted";
import Important from "../pages/important/important";
import Favorite from "../pages/favorite/favorite";
import * as Routes from "./routepaths";
import ProtectedLogin from "../protectedRoute/loginProtected";

function AllRoutes() {
  return (
    <div>
      <Switch>
        <ProtectedLogin exact path={Routes.login} component={Login} />
        <Route exact path={Routes.mainMenu} component={MainMenu} />
        <Route exact path={Routes.completed} component={Completed} />
        <Route exact path={Routes.noCompleted} component={UnCompleted} />
        <Route exact path={Routes.important} component={Important} />
        <Route exact path={Routes.favorite} component={Favorite} />
      </Switch>
    </div>
  );
}

export default AllRoutes;
