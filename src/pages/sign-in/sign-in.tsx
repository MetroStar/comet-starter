import {
  Alert,
  Button,
  ButtonGroup,
  Form,
  TextInput,
} from '@metrostar/comet-uswds';
import { FormInput } from '@src/types/form';
import {
  PASSWORD_RULES,
  REQUIRED_FORM_FIELDS_RULES,
} from '@src/utils/constants';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';

export const SignIn = (): React.ReactElement => {
  const navigate = useNavigate();
  const { signIn, signInWithSso, error } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInput>({
    defaultValues: {
      username: '',
      password: '',
      termsConsent: false,
    },
    mode: 'onChange',
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<FormInput> = (formData) => {
    signIn(formData.username, formData.password).then((response) => {
      if (response.status === 200) {
        navigate('/dashboard');
      }
    });
  };

  const handleSsoSignIn = (): void => {
    signInWithSso();
  };

  return (
    <div className="sign-in-page">
      <div
        className="sign-in-background"
        style={{
          backgroundImage: 'url("/img/ADVANA.png"), url("/img/AI.jpg")',
          backgroundSize: 'auto, cover',
          backgroundPosition: 'center, center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="sign-in-form-wrapper">
        <div className="sign-in-form">
          <h1>Sign in</h1>
          <h2>Access your account</h2>
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
              render={({ field }) => (
                <TextInput
                  {...field}
                  id="username"
                  label="Email address"
                  autoComplete="username"
                  errors={errors.username?.message}
                  autoFocus
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={PASSWORD_RULES}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  autoComplete="current-password"
                  errors={errors.password?.message}
                />
              )}
            />
            <div className="show-password-link">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  togglePasswordVisibility();
                }}
              >
                {showPassword ? 'Hide password' : 'Show password'}
              </a>
            </div>
            <ButtonGroup>
              <Button
                id="sign-in-sso"
                type="button"
                variant="outline"
                onClick={handleSsoSignIn}
              >
                CAC Login
              </Button>
              <Button id="submit" type="submit" disabled={!isValid}>
                Sign In
              </Button>
            </ButtonGroup>
            <div className="forgot-password-link">
              <a href="#">Forgot password?</a>
            </div>
            <Controller
              name="termsConsent"
              control={control}
              rules={{ required: 'You must agree to the terms.' }}
              render={({ field }) => (
                <>
                  <p className="terms-text">
                    <input
                      type="checkbox"
                      id="termsConsent"
                      name={field.name}
                      checked={field.value}
                      onBlur={field.onBlur}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="margin-right-1"
                    />
                    <label htmlFor="termsConsent">
                      I HAVE READ AND CONSENT TO THE TERMS IN THE INFORMATION
                      SYSTEMS USER AGREEMENT.
                    </label>
                  </p>
                  {errors.termsConsent && (
                    <span className="usa-error-message">
                      {errors.termsConsent.message}
                    </span>
                  )}
                </>
              )}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};
