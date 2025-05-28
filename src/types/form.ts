export interface SignInFormInput {
  username: string;
  password: string;
}

export interface CaseFormInput {
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

export interface ContactFormInput {
  name: string;
  email: string;
  message: string;
}

export type SearchFormElements = {
  search: { value: string };
};
