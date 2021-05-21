import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextInput } from "./FormComponents/TextInput";
import { PasswordInput } from "./FormComponents/PasswordInput";
import { useFormValidation } from "./Hooks/useFormValidation";
import { UserAPIServices } from "./API/UserAPIServices";
import { useToast } from "./Hooks/useToast";
import { useLoginActions } from "./Hooks/useLoginActions";

export function AddUserForm() {
  const { userLogin } = useLoginActions();
  const toast = useToast();
  const formValidation = useFormValidation();
  const { push } = useHistory();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);

  const validationArray = [
    {
      message: "username minimum 8 characters",
      setError: setUsernameError,
      validate() {
        return username.length >= 8;
      },
    },
    {
      setError: setPasswordError,
      message: "Password minimum 8 characters and must match",
      validate() {
        return password === repeatPassword && password.length >= 8;
      },
    },
    {
      setError: setRepeatPasswordError,
      validate() {
        return password === repeatPassword && password.length >= 8;
      },
    },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formValidation(validationArray)) return;
    try {
      const newUser = await UserAPIServices.addUser({ username, password });
      toast.success(`new user ${username} created`);
      await userLogin({ username, password });
      push('/')
    } catch (error) {
      toast({ message: "server error", type: "error" });
    }
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
        <h2>Add User</h2>
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
        <PasswordInput
          id="repeatPassword"
          label="Repeat Password"
          value={repeatPassword}
          error={repeatPasswordError}
          onChange={handleInputChange}
        />
        <div className="flex-center">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <button type="button" className="cancel" onClick={() => push("/")}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
