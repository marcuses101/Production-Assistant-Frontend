import React from "react";
import { Link } from "react-router-dom";
import { useLoginActions } from "./Hooks/useLoginActions";

export default function LoginLinks() {
  const loginActions = useLoginActions();
  return (
    <ul className="links">
      <li><button className="link" onClick={loginActions.demoLogin}>Demo</button></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/new-user">Create Account</Link></li>
    </ul>
  );
}
