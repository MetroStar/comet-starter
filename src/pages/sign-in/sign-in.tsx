import {
  Alert,
  Button,
  ButtonGroup,
  Form,
  TextInput,
} from '@metrostar/comet-uswds';
import { hasSsoConfig } from '@src/utils/auth';
import { formatFieldError } from '@src/utils/form-utils';
import { useForm } from '@tanstack/react-form';
import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import useAuth from '../../hooks/use-auth';

interface SignInFormInput {
  username: string;
  password: string;
}

export const SignIn = (): React.ReactElement => {
  const navigate = useNavigate();
  const { signIn, signInWithSso, error } = useAuth();

  const formSchema = z.object({
    username: z.string().min(1, 'This field is required.'),
    password: z
      .string()
      .min(1, 'This field is required.')
      .min(8, 'Password must be at least 8 characters.'),
  });

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    } as SignInFormInput,
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await signIn(value.username, value.password);
      if (response.status === 200) {
        navigate('/dashboard');
      }
    },
  });

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
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field name="username">
              {(field) => (
                <TextInput
                  id="username"
                  name="username"
                  label="Username"
                  autoComplete="username"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  errors={
                    field.state.meta.errors.length > 0
                      ? formatFieldError(field.state.meta.errors[0])
                      : undefined
                  }
                  autoFocus
                />
              )}
            </form.Field>
            <form.Field name="password">
              {(field) => (
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  autoComplete="current-password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  errors={
                    field.state.meta.errors.length > 0
                      ? formatFieldError(field.state.meta.errors[0])
                      : undefined
                  }
                />
              )}
            </form.Field>
            <ButtonGroup>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    id="submit"
                    type="submit"
                    disabled={isSubmitting || !canSubmit}
                  >
                    Sign In
                  </Button>
                )}
              </form.Subscribe>
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
