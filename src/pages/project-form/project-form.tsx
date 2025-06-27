import {
  Button,
  Select,
  StepIndicator,
  TextArea,
  TextInput,
} from '@metrostar/comet-uswds';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { REQUIRED_FORM_FIELDS_RULES } from '../../utils/constants';

interface ProjectFormData {
  name: string;
  type: string;
  description: string;
  tags: string;
}

export const ProjectForm = (): React.ReactElement => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      name: '',
      type: '',
      description: '',
      tags: '',
    },
  });

  const projectTypes = [
    { label: 'Infrastructure', value: 'infrastructure' },
    { label: 'Data Management', value: 'data-management' },
    { label: 'Security', value: 'security' },
    { label: 'Development', value: 'development' },
    { label: 'Maintenance', value: 'maintenance' },
  ];

  const projectTags = [
    { label: 'High Priority', value: 'high-priority' },
    { label: 'Medium Priority', value: 'medium-priority' },
    { label: 'Low Priority', value: 'low-priority' },
    { label: 'Critical', value: 'critical' },
    { label: 'Routine', value: 'routine' },
  ];

  const steps = [
    'Project Details',
    'Team Assignment',
    'Resources',
    'Timeline',
    'Review',
  ];

  const onSubmit = (_data: ProjectFormData): void => {
    // TODO: Implement form validation and proceed to next step
    // For now, navigate back to dashboard
    navigate('/dashboard');
  };

  return (
    <>
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col">
            <h1 className="margin-bottom-4">New Project</h1>

            <div className="margin-bottom-6">
              <StepIndicator
                id="project-step-indicator"
                steps={steps}
                currentStep={0}
              />
            </div>

            <div className="border-top border-base-lighter margin-bottom-6"></div>

            <div className="grid-row">
              <div className="grid-col-12 tablet:grid-col-8 desktop:grid-col-6">
                <form
                  className="usa-form usa-form--large"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Controller
                    name="name"
                    control={control}
                    rules={REQUIRED_FORM_FIELDS_RULES}
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { ref: _, ...field } }) => (
                      <div className="margin-bottom-4">
                        <TextInput
                          {...field}
                          id="project-name"
                          label="Name"
                          required
                          autoFocus
                          errors={
                            errors.name?.message
                              ? errors.name.message
                              : undefined
                          }
                        />
                      </div>
                    )}
                  />

                  <Controller
                    name="type"
                    control={control}
                    rules={REQUIRED_FORM_FIELDS_RULES}
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { ref: _, ...field } }) => (
                      <div className="margin-bottom-4">
                        <Select
                          {...field}
                          id="project-type"
                          label="Type"
                          required
                          options={projectTypes}
                        />
                      </div>
                    )}
                  />

                  <Controller
                    name="description"
                    control={control}
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { ref: _, ...field } }) => (
                      <div className="margin-bottom-4">
                        <TextArea
                          {...field}
                          id="project-description"
                          label="Description"
                          rows={5}
                        />
                      </div>
                    )}
                  />

                  <Controller
                    name="tags"
                    control={control}
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { ref: _, ...field } }) => (
                      <div className="margin-bottom-4">
                        <Select
                          {...field}
                          id="project-tags"
                          label="Tags"
                          options={projectTags}
                        />
                      </div>
                    )}
                  />

                  <div className="margin-bottom-6">
                    <div className="bg-base-lightest padding-4 radius-lg border border-base-lighter">
                      <label
                        className="usa-label"
                        htmlFor="project-documentation"
                      >
                        Supporting Documentation
                      </label>
                      <div className="text-base-dark margin-bottom-2">
                        Drag file here or choose from folder
                      </div>
                      <input
                        type="file"
                        id="project-documentation"
                        accept=".pdf,.doc,.docx,.txt"
                        className="usa-file-input"
                      />
                    </div>
                  </div>

                  <div className="margin-bottom-6">
                    <Button id="next-step-btn" variant="default" type="submit">
                      Next Step
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
