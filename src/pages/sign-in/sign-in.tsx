import {
  Alert,
  Button,
  ButtonGroup,
  ErrorMessages,
  Form,
  FormGroup,
  Label,
  TextInput,
} from '@metrostar/comet-uswds';
import { FormInput } from '@src/types/form';
import { hasSsoConfig } from '@src/utils/auth';
import {
  PASSWORD_RULES,
  REQUIRED_FORM_FIELDS_RULES,
} from '@src/utils/constants';
import React, { FormEvent } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';

export const SignIn = (): React.ReactElement => {
  const navigate = useNavigate();
  const { signIn, error } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormInput> = () => {
    signIn(false);
    navigate('/dashboard');
  };

  const handleCancel = (event: FormEvent): void => {
    event.preventDefault();
    navigate('/');
  };

  const handleSsoSignIn = (): void => {
    signIn(true);
  };

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
              <Controller
                name="username"
                control={control}
                rules={REQUIRED_FORM_FIELDS_RULES}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { ref: _, ...field } }) => (
                  <TextInput {...field} id="username" autoFocus />
                )}
              />
              {errors.username?.message && (
                <ErrorMessages errors={[errors.username.message]} />
              )}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Controller
                name="password"
                control={control}
                rules={PASSWORD_RULES}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { ref: _, ...field } }) => (
                  <TextInput {...field} id="password" type="password" />
                )}
              />
              {errors.password?.message && (
                <ErrorMessages errors={[errors.password.message]} />
              )}
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
              {hasSsoConfig() && (
                <Button
                  id="sign-in-sso"
                  type="button"
                  variant="outline"
                  onClick={handleSsoSignIn}
                >
                  Sign In with SSO
                </Button>
              )}
            </ButtonGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};
