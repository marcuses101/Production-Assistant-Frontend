import React from "react";
import { Switch, Route } from "react-router-dom";
import { Landing } from "./Landing";
import { AddUserForm } from "./AddUserForm";
import { LoginForm } from "./LoginForm";

export function LoginRouter() {
  return (
    <Switch>
      <Route path="/login" component={LoginForm} />
      <Route path="/new-user" component={AddUserForm} />
      <Route exact path="/" component={Landing} />
    </Switch>
  );
}
