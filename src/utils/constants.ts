export const APP_TITLE = 'Starter App';
export const REQUIRED_FIELD_MESSAGE = 'This field is required.';
export const MIN_PASSWORD_LENGTH = 8;
export const PASSWORD_LENGTH_MESSAGE = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`;

export const REQUIRED_FORM_FIELDS_RULES = {
  required: REQUIRED_FIELD_MESSAGE,
};

export const PASSWORD_RULES = {
  ...REQUIRED_FORM_FIELDS_RULES,
  minLength: { value: MIN_PASSWORD_LENGTH, message: PASSWORD_LENGTH_MESSAGE },
};
