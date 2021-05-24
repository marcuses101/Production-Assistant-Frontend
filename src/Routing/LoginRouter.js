import React from "react";
import { Switch, Route } from "react-router-dom";
import { Landing } from "../Pages/Landing";
import { AddUserForm } from "../Pages/AddUserForm";
import { LoginForm } from "../Pages/LoginForm";

export function LoginRouter(props) {
  return (
    <Switch>
      <Route path="/login" component={LoginForm} />
      <Route path="/new-user" component={AddUserForm} />
      <Route path="/" component={Landing} />
    </Switch>
  );
}
