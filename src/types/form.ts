export interface SignInFormInput {
  username: string;
  password: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  message: string;
}

export type SearchFormElements = {
  search: { value: string };
};
