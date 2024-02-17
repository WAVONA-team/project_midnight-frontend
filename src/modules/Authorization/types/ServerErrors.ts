type RegistrationNames = 'email' | 'password' | 'root' | `root.${string}`;

type FieldError = {
  name: RegistrationNames;
  message: string;
};

export type ServerErrors = {
  fieldErrors?: FieldError[];
  formErrors?: string;
};
