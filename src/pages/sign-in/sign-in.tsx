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
import { useAuth } from "@src/hooks/use-auth";
import { REQUIRED_FORM_FIELDS_RULES } from "@src/utils/constants";
import React, { FormEvent, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

//#region Password Rules
const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_LENGTH_MESSAGE = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
const PASSWORD_RULES = {
  ...REQUIRED_FORM_FIELDS_RULES,
  minLength: { value: MIN_PASSWORD_LENGTH, message: PASSWORD_LENGTH_MESSAGE },
};
//#endregion Password Rules

interface FormInput {
  username: string;
  password: string;
}

export const SignIn = (): React.ReactElement => {
  const { signIn, error, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = ({ username, password }) => {
    console.log(username);
    console.log(password);
    signIn();
  };

  const handleCancel = (event: FormEvent): void => {
    event.preventDefault();
    navigate("/");
  };

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="grid-col-6">
          <h1>Sign In</h1>
          {error && (
            <Alert id="loginAlert" type="error" heading="Error">
              Incorrect email or password was entered.
            </Alert>
          )}
          <Form id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              {errors.username?.message && (
                <ErrorMessages errors={[errors.username.message]} />
              )}
              <Controller
                name="username"
                control={control}
                rules={REQUIRED_FORM_FIELDS_RULES}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { ref: _, ...rest } }) => (
                  <TextInput {...rest} id="username" autoFocus />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              {errors.password?.message && (
                <ErrorMessages errors={[errors.password.message]} />
              )}
              <Controller
                name="password"
                control={control}
                rules={PASSWORD_RULES}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { ref: _, ...rest } }) => (
                  <TextInput {...rest} id="password" autoFocus />
                )}
              />
            </FormGroup>

            <ButtonGroup>
              <Button
                id="submit"
                type="submit"
                disabled={
                  !!errors.username?.message || !!errors.password?.message
                }
              >
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
