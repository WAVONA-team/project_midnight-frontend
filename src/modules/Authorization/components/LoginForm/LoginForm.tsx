import React from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Input from '@/ui/Input/Input';

import { authClientActions } from '../../api/authClient';
import { LoginInputs, ServerErrors } from '../../types';

const LoginForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    control,
    setError,
  } = useForm<LoginInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = (formData) => {
    const { email, password } = formData;

    authClientActions
      .login(email, password)
      .then(() => navigate('/', { replace: true }))
      .catch(({ fieldErrors, formErrors }: ServerErrors) => {
        if (fieldErrors) {
          fieldErrors.forEach((serverError) => {
            const { name, message } = serverError;

            setError(name, { type: 'server side', message });
          });
        }

        if (formErrors) {
          setError('root', { type: 'server side', message: formErrors });
        }
      });
  };

  return (
    <form action="#" onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <p>{errors.root.message}</p>}

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            type="password"
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
            error={errors.password?.message}
          />
        )}
      />

      <button>Submit</button>
    </form>
  );
});

export default LoginForm;
