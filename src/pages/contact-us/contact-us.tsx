import {
  Alert,
  Button,
  Form,
  TextArea,
  TextInput,
} from '@metrostar/comet-uswds';
import { formatFieldError } from '@src/utils/form-utils';
import { useForm } from '@tanstack/react-form';
import React from 'react';
import { z } from 'zod';

interface ContactFormInput {
  name: string;
  email: string;
  message: string;
}

export const ContactUs = (): React.ReactElement => {
  const [submitted, setSubmitted] = React.useState(false);

  const formSchema = z.object({
    name: z.string().min(1, 'This field is required.'),
    email: z
      .string()
      .min(1, 'This field is required.')
      .regex(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address.',
      ),
    message: z.string().min(1, 'This field is required.'),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    } as ContactFormInput,
    validators: {
      onChange: formSchema,
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
            <form.Field name="name">
              {(field) => (
                <TextInput
                  id="name"
                  name="name"
                  label="Name"
                  autoComplete="name"
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
            <form.Field name="email">
              {(field) => (
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  autoComplete="email"
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
            <form.Field name="message">
              {(field) => (
                <TextArea
                  id="message"
                  name="message"
                  label="Message"
                  autoComplete="message"
                  rows={3}
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
