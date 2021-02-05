import React from "react";
import { Link } from "react-router-dom";

export default function LoginLinks() {
  return (
    <ul className="links">
      <button className="link">Demo</button>
      <Link to="/login">Login</Link>
      <Link to="/new-user">Create Account</Link>
    </ul>
  );
}
