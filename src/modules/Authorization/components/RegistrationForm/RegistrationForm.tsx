import React, { useContext } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '@/components/AuthProvider/AuthProvider';

import Input from '@/ui/Input/Input';

import { RegistrationInputs, ServerErrors } from '../../types';

const RegistrationForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
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

  const onSubmit: SubmitHandler<RegistrationInputs> = (formData) => {
    const { email, password } = formData;

    register(email, password)
      .then(() => navigate('/verify', { replace: true }))
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
      <Link to={'/login'}>Already have an account? Sign in</Link>

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

export default RegistrationForm;
