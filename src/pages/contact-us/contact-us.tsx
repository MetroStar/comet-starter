import {
  Alert,
  Button,
  Form,
  TextArea,
  TextInput,
} from '@metrostar/comet-uswds';
import { ContactFormInput } from '@src/types/form';
import { REQUIRED_FORM_FIELDS_RULES } from '@src/utils/constants';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export const ContactUs = (): React.ReactElement => {
  const [submitted, setSubmitted] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInput>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormInput> = (formData) => {
    // eslint-disable-next-line no-console
    console.log('Form submitted:', formData);
    // TODO: update to send form data to a server or API
    setSubmitted(true);
  };

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
            id="login-form"
            className="maxw-mobile-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="name"
              control={control}
              rules={REQUIRED_FORM_FIELDS_RULES}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { ref: _, ...field } }) => (
                <TextInput
                  {...field}
                  id="name"
                  label="Name"
                  autoComplete="name"
                  errors={
                    errors.name?.message ? errors.name.message : undefined
                  }
                  autoFocus
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={REQUIRED_FORM_FIELDS_RULES}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { ref: _, ...field } }) => (
                <TextInput
                  {...field}
                  id="email"
                  type="email"
                  label="Email"
                  autoComplete="email"
                  errors={
                    errors.email?.message ? errors.email.message : undefined
                  }
                />
              )}
            />
            <Controller
              name="message"
              control={control}
              rules={REQUIRED_FORM_FIELDS_RULES}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { ref: _, ...field } }) => (
                <TextArea
                  {...field}
                  id="message"
                  label="Message"
                  autoComplete="message"
                  rows={3}
                  errors={
                    errors.message?.message ? errors.message.message : undefined
                  }
                />
              )}
            />
            <Button
              id="submit"
              type="submit"
              disabled={
                !!errors.name?.message ||
                !!errors.email?.message ||
                !!errors.message?.message
              }
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
