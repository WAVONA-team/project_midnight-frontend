import React, { useContext } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '@/components/AuthProvider/AuthProvider';

import Input from '@/ui/Input/Input';

import { LoginInputs, ServerErrors } from '../../types';

const LoginForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
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

    login(email, password)
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
      <Link to={'/register'}>Dont have an account? Sign up</Link>

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
