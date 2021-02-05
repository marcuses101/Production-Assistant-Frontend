import React, { useState } from "react";
import { TextInput } from "./FormComponents/TextInput";

export function AddUserForm() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
  }
  function handleInputChange(e) {
    const setters = {
      username: setUsername,
      password: setPassword,
      repeatPassword: setRepeatPassword,
    };
    setters[e.target.id](e.target.value);
  }

  return (
    <section className="AddUserForm">
      <form onSubmit={handleSubmit}>
        <h1>Add User</h1>
        <TextInput
          id="username"
          label="Username"
          value={username}
          error={usernameError}
          onChange={handleInputChange}
        />
        <TextInput
          id="password"
          label="Password"
          value={password}
          error={passwordError}
          onChange={handleInputChange}
        />
        <TextInput
          id="repeatPassword"
          label="Repeat Password"
          value={repeatPassword}
          error={repeatPasswordError}
          onChange={handleInputChange}
        />
        <div className="flex-center">
           <button type="submit">Submit</button>
        <button className="cancel">Cancel</button>
        </div>

      </form>
    </section>
  );
}
