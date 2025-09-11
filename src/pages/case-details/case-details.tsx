/* eslint-disable @typescript-eslint/no-unused-vars */

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
import { REQUIRED_FORM_FIELDS_RULES } from '@src/utils/constants';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import ErrorNotification from '../../components/error-notification/error-notification';

interface CaseFormInput {
  first_name: string;
  middle_name: string;
  last_name: string;
  ssn: string;
  date_of_birth: string;
  gender: string;
  home_phone: string;
  mobile_phone: string;
  email: string;
}

export const CaseDetails = (): React.ReactElement => {
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const { getCase, updateCase } = useCasesApi();
  const { isLoading, data, error, isError } = getCase(Number(id));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CaseFormInput>({
    values: {
      first_name: data?.applicant.first_name || '',
      middle_name: data?.applicant.middle_name || '',
      last_name: data?.applicant.last_name || '',
      ssn: data?.applicant.ssn || '',
      date_of_birth: data?.applicant.date_of_birth
        ? new Date(data.applicant.date_of_birth).toLocaleDateString('en-US')
        : '',
      gender: data?.applicant.gender || '',
      home_phone: data?.applicant.home_phone || '',
      mobile_phone: data?.applicant.mobile_phone || '',
      email: data?.applicant.email || '',
    },
  });

  const onSubmit: SubmitHandler<CaseFormInput> = (formData) => {
    updateCase.mutate({
      applicant: {
        first_name: formData.first_name,
        middle_name: formData.middle_name,
        last_name: formData.last_name,
        ssn: formData.ssn,
        date_of_birth: new Date(formData.date_of_birth),
        gender: formData.gender,
        home_phone: formData.home_phone,
        mobile_phone: formData.mobile_phone,
        email: formData.email,
        ...data?.applicant,
      },
      status: 'In Progress',
      updated_at: new Date(),
      ...data,
    } as Case);
    // Reset the form to view state
    setEditing(false);
  };

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
                  <Button
                    id="save-case-button"
                    type="submit"
                    variant="default"
                    form="case-details-form"
                    disabled={!editing}
                  >
                    Save Case
                  </Button>
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
                    id="case-details-form"
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ maxWidth: '100%' }}
                  >
                    <div className="grid-row grid-gap-2">
                      <div className="grid-col-12 margin-bottom-2">
                        <div className="grid-row grid-gap">
                          <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4 margin-bottom-2">
                            {editing ? (
                              <Controller
                                name="first_name"
                                control={control}
                                rules={REQUIRED_FORM_FIELDS_RULES}
                                render={({ field: { ref: _, ...field } }) => (
                                  <TextInput
                                    {...field}
                                    id="first_name"
                                    label="First Name"
                                    required
                                    errors={
                                      errors.first_name?.message
                                        ? errors.first_name.message
                                        : undefined
                                    }
                                    autoFocus
                                  />
                                )}
                              />
                            ) : (
                              <>
                                <Label className="text-bold">First Name</Label>
                                <div>{data.applicant.first_name}</div>
                              </>
                            )}
                          </div>
                          <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4 margin-bottom-2">
                            {editing ? (
                              <Controller
                                name="middle_name"
                                control={control}
                                render={({ field: { ref: _, ...field } }) => (
                                  <TextInput
                                    {...field}
                                    id="middle_name"
                                    label="Middle Name"
                                  />
                                )}
                              />
                            ) : (
                              <>
                                <Label className="text-bold">Middle Name</Label>
                                <div>{data.applicant.middle_name}</div>
                              </>
                            )}
                          </div>
                          <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4 margin-bottom-2">
                            {editing ? (
                              <Controller
                                name="last_name"
                                control={control}
                                rules={REQUIRED_FORM_FIELDS_RULES}
                                render={({ field: { ref: _, ...field } }) => (
                                  <TextInput
                                    {...field}
                                    id="last_name"
                                    label="Last Name"
                                    required
                                    errors={
                                      errors.last_name?.message
                                        ? errors.last_name.message
                                        : undefined
                                    }
                                  />
                                )}
                              />
                            ) : (
                              <>
                                <Label className="text-bold">Last Name</Label>
                                <div>{data.applicant.last_name}</div>
                              </>
                            )}
                          </div>
                          <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4 margin-bottom-2">
                            {editing ? (
                              <Controller
                                name="ssn"
                                control={control}
                                rules={REQUIRED_FORM_FIELDS_RULES}
                                render={({ field: { ref: _, ...field } }) => (
                                  <TextInput
                                    {...field}
                                    id="ssn"
                                    label="SSN"
                                    required
                                    errors={
                                      errors.ssn?.message
                                        ? errors.ssn.message
                                        : undefined
                                    }
                                    mask={'ssn'}
                                  />
                                )}
                              />
                            ) : (
                              <>
                                <Label className="text-bold">SSN</Label>
                                <div>{data.applicant.ssn}</div>
                              </>
                            )}
                          </div>
                          <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4 margin-bottom-2">
                            {editing ? (
                              <Controller
                                name="date_of_birth"
                                control={control}
                                rules={REQUIRED_FORM_FIELDS_RULES}
                                render={({
                                  field: { ref: _, value, ...field },
                                }) => (
                                  <DatePicker
                                    {...field}
                                    id="date_of_birth"
                                    label="Date of Birth"
                                    required
                                    defaultValue={value}
                                    errors={
                                      errors.date_of_birth?.message
                                        ? errors.date_of_birth.message
                                        : undefined
                                    }
                                  />
                                )}
                              />
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
                              <Controller
                                name="gender"
                                control={control}
                                rules={REQUIRED_FORM_FIELDS_RULES}
                                render={({
                                  field: { ref: _, value, ...field },
                                }) => (
                                  <Select
                                    {...field}
                                    id="gender"
                                    label="Gender"
                                    required
                                    options={[
                                      { label: 'Male', value: 'Male' },
                                      { label: 'Female', value: 'Female' },
                                      { label: 'Other', value: 'Other' },
                                    ]}
                                    defaultValue={value}
                                    errors={
                                      errors.gender?.message
                                        ? errors.gender.message
                                        : undefined
                                    }
                                  />
                                )}
                              />
                            ) : (
                              <>
                                <Label className="text-bold">Gender</Label>
                                <div>{data.applicant.gender}</div>
                              </>
                            )}
                          </div>
                          <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4 margin-bottom-2">
                            {editing ? (
                              <Controller
                                name="home_phone"
                                control={control}
                                rules={REQUIRED_FORM_FIELDS_RULES}
                                render={({ field: { ref: _, ...field } }) => (
                                  <TextInput
                                    {...field}
                                    id="home_phone"
                                    label="Home Phone"
                                    required
                                    errors={
                                      errors.home_phone?.message
                                        ? errors.home_phone.message
                                        : undefined
                                    }
                                    mask={'phone_number'}
                                  />
                                )}
                              />
                            ) : (
                              <>
                                <Label className="text-bold">Home Phone</Label>
                                <div>{data.applicant.home_phone}</div>
                              </>
                            )}
                          </div>
                          <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4 margin-bottom-2">
                            {editing ? (
                              <Controller
                                name="mobile_phone"
                                control={control}
                                render={({ field: { ref: _, ...field } }) => (
                                  <TextInput
                                    {...field}
                                    id="mobile_phone"
                                    label="Mobile Phone"
                                    mask={'phone_number'}
                                  />
                                )}
                              />
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
                              <Controller
                                name="email"
                                control={control}
                                render={({ field: { ref: _, ...field } }) => (
                                  <TextInput
                                    {...field}
                                    id="email"
                                    label="Email"
                                  />
                                )}
                              />
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
