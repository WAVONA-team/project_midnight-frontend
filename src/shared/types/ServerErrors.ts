type FieldError = {
  name: string;
  message: string;
};

export type ServerErrors = {
  fieldErrors?: FieldError[];
  formErrors?: string;
};
