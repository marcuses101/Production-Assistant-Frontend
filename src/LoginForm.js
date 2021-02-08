import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextInput } from "./FormComponents/TextInput";
import {PasswordInput} from './FormComponents/PasswordInput'
import { useFormValidation } from "./Hooks/useFormValidation";

export function LoginForm() {
  const formValidation = useFormValidation();
  const { push } = useHistory();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);


  const validationArray = [
    {
      message:'Username minimum 8 characters',
      setError: setUsernameError,
      validate() {
        return username.length >= 8;
      },
    },
    {
      setError: setPasswordError,
      message:'Password minimum 8 characters',
      validate() {
        return password.length >= 8;
      },
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValidation(validationArray)) return;
  }
  function handleInputChange(e) {
    const setters = {
      username: setUsername,
      password: setPassword,
    };
    setters[e.target.id](e.target.value);
  }

  return (
    <section className="AddUserForm">
      <form onSubmit={handleSubmit}>
        <h1>User Login</h1>
        <TextInput
          id="username"
          label="Username"
          value={username}
          error={usernameError}
          onChange={handleInputChange}
        />
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          error={passwordError}
          onChange={handleInputChange}
        />
        <div className="flex-center">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <button className="cancel" onClick={() => push("/")}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
