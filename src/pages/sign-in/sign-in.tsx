import {
  Alert,
  Button,
  ButtonGroup,
  Form,
  TextInput,
} from '@metrostar/comet-uswds';
import { SignInFormInput } from '@src/types/form';
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
  const { signIn, signInWithSso, error } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInput>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (formData) => {
    signIn(formData.username, formData.password).then((response) => {
      if (response.status === 200) {
        navigate('/dashboard');
      }
    });
  };

  const handleCancel = (event: FormEvent): void => {
    event.preventDefault();
    navigate('/');
  };

  const handleSsoSignIn = (): void => {
    signInWithSso();
  };

  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="tablet:grid-col-6">
          <h1>Sign In</h1>
          {error && (
            <Alert id="loginAlert" type="error" heading="Error">
              There was an error signing in. Please try again.
            </Alert>
          )}
          <Form
            id="login-form"
            className="maxw-mobile-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="username"
              control={control}
              rules={REQUIRED_FORM_FIELDS_RULES}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { ref: _, ...field } }) => (
                <TextInput
                  {...field}
                  id="username"
                  label="Username"
                  autoComplete="username"
                  errors={
                    errors.username?.message
                      ? errors.username.message
                      : undefined
                  }
                  autoFocus
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={PASSWORD_RULES}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { ref: _, ...field } }) => (
                <TextInput
                  {...field}
                  id="password"
                  type="password"
                  label="Password"
                  autoComplete="current-password"
                  errors={
                    errors.password?.message
                      ? errors.password.message
                      : undefined
                  }
                />
              )}
            />
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
