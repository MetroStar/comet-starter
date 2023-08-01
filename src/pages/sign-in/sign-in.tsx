import {
  Alert,
  Button,
  ButtonGroup,
  ErrorMessages,
  Form,
  FormGroup,
  Label,
  TextInput,
} from "@metrostar/comet-uswds";
import { REQUIRED_FIELD_MESSAGE } from "@src/utils/constants";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/use-auth";

export const SignIn = (): React.ReactElement => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasLoginError, setHasLoginError] = useState(false);
  const [usernameErrors, setUsernameErrors] = useState([] as string[]);
  const [passwordErrors, setPasswordErrors] = useState([] as string[]);
  const { signIn, isSignedIn, error } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      setHasLoginError(false);
      navigate("/");
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (error) {
      setHasLoginError(true);
    }
  }, [error]);

  const handleLogin = (event: FormEvent): void => {
    event.preventDefault();
    username === ""
      ? setUsernameErrors([REQUIRED_FIELD_MESSAGE])
      : setUsernameErrors([]);
    password === ""
      ? setPasswordErrors([REQUIRED_FIELD_MESSAGE])
      : setPasswordErrors([]);

    if (username.length === 0 || password.length === 0) {
      setHasLoginError(true);
    } else {
      signIn();
    }
  };

  const handleCancel = (event: FormEvent): void => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="grid-col-6">
          <h1>Sign In</h1>
          {hasLoginError && (
            <Alert id="loginAlert" type="error" heading="Error">
              Incorrect email or password was entered.
            </Alert>
          )}
          <Form id="login-form" onSubmit={handleLogin}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <ErrorMessages errors={usernameErrors} />
              <TextInput
                id="username"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                autoFocus
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <ErrorMessages errors={passwordErrors} />
              <TextInput
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormGroup>

            <ButtonGroup>
              <Button id="submit" type="submit">
                Sign In
              </Button>
              <Button
                id="cancel"
                type="button"
                variant="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};
