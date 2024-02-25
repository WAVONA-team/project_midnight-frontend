import React from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { RegistrationInputs } from '@/modules/Authorization/types';

import Input from '@/ui/Input/Input';

const RegistrationForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { register } = useStore(({ register }) => ({
    register,
  }));

  const {
    formState: { errors },
    handleSubmit,
    control,
    setError,
  } = useForm<RegistrationInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<RegistrationInputs> = async (formData) => {
    const { email, password } = formData;

    await register(email, password)
      .then(() => navigate('/verify', { replace: true }))
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
      <Link to={'/login'}>Already have an account? Sign in</Link>

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

export default RegistrationForm;
