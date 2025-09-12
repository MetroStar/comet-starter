import {
  Alert,
  Button,
  Form,
  TextArea,
  TextInput,
} from '@metrostar/comet-uswds';
import { useForm } from '@tanstack/react-form';
import React from 'react';

export const ContactUs = (): React.ReactElement => {
  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      // eslint-disable-next-line no-console
      console.log('Form submitted:', value);
      // TODO: update to send form data to a server or API
      setSubmitted(true);
    },
  });

  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="grid-col">
          <h1>Contact Us</h1>
          {submitted && (
            <Alert
              id="success-alert"
              type="success"
              heading="Form submitted successfully!"
            >
              Someone will be in touch soon.
            </Alert>
          )}
          <Form
            id="contact-form"
            className="maxw-mobile-lg"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'This field is required.' : undefined,
              }}
            >
              {(field) => (
                <TextInput
                  id="name"
                  label="Name"
                  autoComplete="name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  errors={
                    field.state.meta.errors.length > 0
                      ? field.state.meta.errors[0]
                      : undefined
                  }
                  autoFocus
                />
              )}
            </form.Field>
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'This field is required.';
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(value))
                    return 'Please enter a valid email address.';
                  return undefined;
                },
              }}
            >
              {(field) => (
                <TextInput
                  id="email"
                  type="email"
                  label="Email"
                  autoComplete="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  errors={
                    field.state.meta.errors.length > 0
                      ? field.state.meta.errors[0]
                      : undefined
                  }
                />
              )}
            </form.Field>
            <form.Field
              name="message"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'This field is required.' : undefined,
              }}
            >
              {(field) => (
                <TextArea
                  id="message"
                  label="Message"
                  autoComplete="message"
                  rows={3}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  errors={
                    field.state.meta.errors.length > 0
                      ? field.state.meta.errors[0]
                      : undefined
                  }
                />
              )}
            </form.Field>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  id="submit"
                  type="submit"
                  disabled={isSubmitting || !canSubmit}
                >
                  Submit
                </Button>
              )}
            </form.Subscribe>
          </Form>
        </div>
      </div>
    </div>
  );
};
