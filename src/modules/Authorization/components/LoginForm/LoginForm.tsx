import React from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { LoginInputs } from '@/modules/Authorization/types';

import Input from '@/ui/Input/Input';

const LoginForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { login } = useStore(({ login }) => ({
    login,
  }));
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

  const onSubmit: SubmitHandler<LoginInputs> = async (formData) => {
    const { email, password } = formData;

    await login(email, password)
      .then(() => navigate('/', { replace: true }))
      .catch(({ fieldErrors, formErrors }: ServerErrors) => {
        if (fieldErrors) {
          fieldErrors.forEach((serverError) => {
            const { name, message } = serverError;

            setError(`root.${name}`, { type: 'server side', message });
          });
        }

        if (formErrors) {
          setError('root.formErrors', {
            type: 'server side',
            message: formErrors,
          });
        }
      });
  };

  return (
    <form action="#" onSubmit={handleSubmit(onSubmit)}>
      <Link to={'/register'}>Dont have an account? Sign up</Link>
      <Link to={'/reset'}>Forgot password? Reset</Link>

      {errors.root?.formErrors && <p>{errors.root.formErrors.message}</p>}

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
            error={errors.root?.email?.message}
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
            error={errors.root?.password?.message}
          />
        )}
      />

      <button>Submit</button>
    </form>
  );
});

export default LoginForm;
