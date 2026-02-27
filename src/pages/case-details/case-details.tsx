import { Spinner } from '@metrostar/comet-extras';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  DatePicker,
  Form,
  Label,
  Select,
  TextInput,
} from '@metrostar/comet-uswds';
import useCasesApi from '@src/hooks/use-cases-api';
import { Case } from '@src/types';
import { formatFieldError } from '@src/utils/form-utils';
import { useForm } from '@tanstack/react-form';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import ErrorNotification from '../../components/error-notification/error-notification';

interface CaseFormInput {
  first_name: string;
  middle_name?: string;
  last_name: string;
  ssn: string;
  date_of_birth: string;
  gender?: string;
  home_phone: string;
  mobile_phone?: string;
  email?: string;
}

export const CaseDetails = (): React.ReactElement => {
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const { getCase, updateCase } = useCasesApi();
  const { isLoading, data, error, isError } = getCase(Number(id));

  const formSchema = z.object({
    first_name: z.string().min(1, 'This field is required.'),
    middle_name: z.string().optional(),
    last_name: z.string().min(1, 'This field is required.'),
    ssn: z.string().min(1, 'This field is required.'),
    date_of_birth: z.string().min(1, 'This field is required.'),
    gender: z.string().optional(),
    home_phone: z.string().min(1, 'This field is required.'),
    mobile_phone: z.string().optional(),
    email: z
      .string()
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email address.',
      )
      .optional()
      .or(z.literal('')),
  });

  const form = useForm({
    defaultValues: {
      first_name: data?.applicant.first_name || '',
      middle_name: data?.applicant.middle_name || '',
      last_name: data?.applicant.last_name || '',
      ssn: data?.applicant.ssn || '',
      date_of_birth: '',
      gender: data?.applicant.gender || '',
      home_phone: data?.applicant.home_phone || '',
      mobile_phone: data?.applicant.mobile_phone || '',
      email: data?.applicant.email || '',
    } as CaseFormInput,
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateCase.mutateAsync({
          applicant: {
            first_name: value.first_name,
            middle_name: value.middle_name,
            last_name: value.last_name,
            ssn: value.ssn,
            date_of_birth: new Date(value.date_of_birth),
            gender: value.gender,
            home_phone: value.home_phone,
            mobile_phone: value.mobile_phone,
            email: value.email,
            ...data?.applicant,
          },
          status: 'In Progress',
          updated_at: new Date(),
          ...data,
        } as Case);
        // Reset the form to view state
        setEditing(false);
      } catch {
        // Error will be handled by the mutation error state
        // Keep form in editing state so user can retry
      }
    },
  });

  // Update form values when data changes
  useEffect(() => {
    if (data) {
      form.setFieldValue('first_name', data.applicant.first_name || '');
      form.setFieldValue('middle_name', data.applicant.middle_name || '');
      form.setFieldValue('last_name', data.applicant.last_name || '');
      form.setFieldValue('ssn', data.applicant.ssn || '');
      form.setFieldValue(
        'date_of_birth',
        data.applicant.date_of_birth
          ? new Date(data.applicant.date_of_birth).toLocaleDateString('en-US')
          : '',
      );
      form.setFieldValue('gender', data.applicant.gender || '');
      form.setFieldValue('home_phone', data.applicant.home_phone || '');
      form.setFieldValue('mobile_phone', data.applicant.mobile_phone || '');
      form.setFieldValue('email', data.applicant.email || '');
    }
  }, [data, form]);

  useEffect(() => {
    if (editing && data) {
      // Focus the first input when entering edit mode
      const firstInput = document.getElementById('first_name');
      firstInput?.focus();
    }
  }, [editing, data]);

  return (
    <div className="grid-container">
      <>
        <div className="grid-row">
          <div className="grid-col">
            <div className="display-flex flex-row flex-justify">
              <div>
                <h1>Case: {data?.id}</h1>
                <h2 style={{ fontSize: '18px' }}>Status: {data?.status}</h2>
              </div>
              <div className="display-flex flex-align-start margin-top-3">
                <ButtonGroup>
                  <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                  >
                    {([canSubmit, isSubmitting]) => (
                      <Button
                        id="save-case-button"
                        type="submit"
                        variant="default"
                        form="case-details-form"
                        disabled={!editing || isSubmitting || !canSubmit}
                      >
                        {isSubmitting ? 'Saving...' : 'Save Case'}
                      </Button>
                    )}
                  </form.Subscribe>
                  <Button
                    id="edit-case-button"
                    type="button"
                    variant={editing ? 'outline' : 'default'}
                    onClick={() => setEditing(!editing)}
                  >
                    {editing ? 'Cancel Edit' : 'Edit Case'}
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
        {isError && (
          <div className="grid-row padding-bottom-2">
            <div className="grid-col">
              <ErrorNotification error={error.message} />
            </div>
          </div>
        )}
        <div className="grid-row">
          <div className="grid-col">
            {isLoading ? (
              <Spinner
                id="spinner"
                type="small"
                loadingText="Loading..."
                className="padding-top-2"
              />
            ) : data ? (
              <Card id="details-card">
                <CardBody>
                  <Form
                    key={`case-form-${data.id}`}
                    id="case-details-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      form.handleSubmit();
                    }}
                    style={{ maxWidth: '100%' }}
                  >
                    <div className="grid-row grid-gap-2">
                      <div className="grid-col-12 margin-bottom-2">
                        <div className="grid-row grid-gap">
                          <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4 margin-bottom-2">
                            {editing ? (
                              <form.Field name="first_name">
                                {(field) => (
                                  <TextInput
                                    id="first_name"
                                    name="first_name"
                                    label="First Name"
                                    required
                                    value={field.state.value}
                                    onChange={(e) =>
                                      field.handleChange(e.target.value)
                                    }
                                    onBlur={field.handleBlur}
                                    errors={
                                      field.state.meta.errors.length > 0
                                        ? formatFieldError(
                                            field.state.meta.errors[0],
                                          )
                                        : undefined
                                    }
                                    autoFocus
                                  />
                                )}
                              </form.Field>
                            ) : (
                              <>
                                <Label className="text-bold">First Name</Label>
                                <div>{data.applicant.first_name}</div>
                              </>
                            )}
                          </div>
                          <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4 margin-bottom-2">
                            {editing ? (
                              <form.Field name="middle_name">
                                {(field) => (
                                  <TextInput
                                    id="middle_name"
                                    name="middle_name"
                                    label="Middle Name"
                                    value={field.state.value}
                                    onChange={(e) =>
                                      field.handleChange(e.target.value)
                                    }
                                    onBlur={field.handleBlur}
                                    errors={
                                      field.state.meta.errors.length > 0
                                        ? formatFieldError(
                                            field.state.meta.errors[0],
                                          )
                                        : undefined
                                    }
                                  />
                                )}
                              </form.Field>
                            ) : (
                              <>
                                <Label className="text-bold">Middle Name</Label>
                                <div>{data.applicant.middle_name}</div>
                              </>
                            )}
                          </div>
                          <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4 margin-bottom-2">
                            {editing ? (
                              <form.Field name="last_name">
                                {(field) => (
                                  <TextInput
                                    id="last_name"
                                    name="last_name"
                                    label="Last Name"
                                    required
                                    value={field.state.value}
                                    onChange={(e) =>
                                      field.handleChange(e.target.value)
                                    }
                                    onBlur={field.handleBlur}
                                    errors={
                                      field.state.meta.errors.length > 0
                                        ? formatFieldError(
                                            field.state.meta.errors[0],
                                          )
                                        : undefined
                                    }
                                  />
                                )}
                              </form.Field>
                            ) : (
                              <>
                                <Label className="text-bold">Last Name</Label>
                                <div>{data.applicant.last_name}</div>
                              </>
                            )}
                          </div>
                          <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4 margin-bottom-2">
                            {editing ? (
                              <form.Field name="ssn">
                                {(field) => (
                                  <TextInput
                                    id="ssn"
                                    name="ssn"
                                    label="SSN"
                                    required
                                    value={field.state.value}
                                    onChange={(e) =>
                                      field.handleChange(e.target.value)
                                    }
                                    onBlur={field.handleBlur}
                                    errors={
                                      field.state.meta.errors.length > 0
                                        ? formatFieldError(
                                            field.state.meta.errors[0],
                                          )
                                        : undefined
                                    }
                                    mask={'ssn'}
                                  />
                                )}
                              </form.Field>
                            ) : (
                              <>
                                <Label className="text-bold">SSN</Label>
                                <div>{data.applicant.ssn}</div>
                              </>
                            )}
                          </div>
                          <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4 margin-bottom-2">
                            {editing ? (
                              <form.Field name="date_of_birth">
                                {(field) => (
                                  <DatePicker
                                    id="date_of_birth"
                                    name="date_of_birth"
                                    label="Date of Birth"
                                    required
                                    defaultValue={field.state.value}
                                    onChange={(e) =>
                                      field.handleChange(
                                        (e.target as HTMLInputElement).value,
                                      )
                                    }
                                    onBlur={field.handleBlur}
                                    errors={
                                      field.state.meta.errors.length > 0
                                        ? formatFieldError(
                                            field.state.meta.errors[0],
                                          )
                                        : undefined
                                    }
                                  />
                                )}
                              </form.Field>
                            ) : (
                              <>
                                <Label className="text-bold">
                                  Date of Birth
                                </Label>
                                <div>
                                  {new Date(
                                    data.applicant.date_of_birth,
                                  ).toLocaleDateString('en-US')}
                                </div>
                              </>
                            )}
                          </div>
                          <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4 margin-bottom-2">
                            {editing ? (
                              <form.Field name="gender">
                                {(field) => (
                                  <Select
                                    id="gender"
                                    name="gender"
                                    label="Gender"
                                    required
                                    options={[
                                      { label: 'Male', value: 'Male' },
                                      { label: 'Female', value: 'Female' },
                                      { label: 'Other', value: 'Other' },
                                    ]}
                                    defaultValue={field.state.value}
                                    onChange={(e) =>
                                      field.handleChange(e.target.value)
                                    }
                                    onBlur={field.handleBlur}
                                    errors={
                                      field.state.meta.errors.length > 0
                                        ? formatFieldError(
                                            field.state.meta.errors[0],
                                          )
                                        : undefined
                                    }
                                  />
                                )}
                              </form.Field>
                            ) : (
                              <>
                                <Label className="text-bold">Gender</Label>
                                <div>{data.applicant.gender}</div>
                              </>
                            )}
                          </div>
                          <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4 margin-bottom-2">
                            {editing ? (
                              <form.Field name="home_phone">
                                {(field) => (
                                  <TextInput
                                    id="home_phone"
                                    name="home_phone"
                                    label="Home Phone"
                                    required
                                    value={field.state.value}
                                    onChange={(e) =>
                                      field.handleChange(e.target.value)
                                    }
                                    onBlur={field.handleBlur}
                                    errors={
                                      field.state.meta.errors.length > 0
                                        ? formatFieldError(
                                            field.state.meta.errors[0],
                                          )
                                        : undefined
                                    }
                                    mask={'phone_number'}
                                  />
                                )}
                              </form.Field>
                            ) : (
                              <>
                                <Label className="text-bold">Home Phone</Label>
                                <div>{data.applicant.home_phone}</div>
                              </>
                            )}
                          </div>
                          <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4 margin-bottom-2">
                            {editing ? (
                              <form.Field name="mobile_phone">
                                {(field) => (
                                  <TextInput
                                    id="mobile_phone"
                                    name="mobile_phone"
                                    label="Mobile Phone"
                                    value={field.state.value}
                                    onChange={(e) =>
                                      field.handleChange(e.target.value)
                                    }
                                    onBlur={field.handleBlur}
                                    errors={
                                      field.state.meta.errors.length > 0
                                        ? formatFieldError(
                                            field.state.meta.errors[0],
                                          )
                                        : undefined
                                    }
                                    mask={'phone_number'}
                                  />
                                )}
                              </form.Field>
                            ) : (
                              <>
                                <Label className="text-bold">
                                  Mobile Phone
                                </Label>
                                <div>{data.applicant.mobile_phone}</div>
                              </>
                            )}
                          </div>
                          <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4 margin-bottom-2">
                            {editing ? (
                              <form.Field name="email">
                                {(field) => (
                                  <TextInput
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={field.state.value}
                                    onChange={(e) =>
                                      field.handleChange(e.target.value)
                                    }
                                    onBlur={field.handleBlur}
                                    errors={
                                      field.state.meta.errors.length > 0
                                        ? formatFieldError(
                                            field.state.meta.errors[0],
                                          )
                                        : undefined
                                    }
                                  />
                                )}
                              </form.Field>
                            ) : (
                              <>
                                <Label className="text-bold">Email</Label>
                                <div>{data.applicant.email}</div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            ) : (
              <>No items found</>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default CaseDetails;
