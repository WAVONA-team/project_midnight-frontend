import React, { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { LoginInputs } from '@/modules/Authorization/types';
import { FormContainer } from '@/modules/Authorization/ui/FormContainer';
import { FormHeader } from '@/modules/Authorization/ui/FormHeader';

import { MainButton, TextButtonLink } from '@/ui/Button';
import { DefaultInput, PasswordInput } from '@/ui/Input';

const LoginForm: React.FC = React.memo(() => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
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

    setIsButtonLoading(true);

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
      })
      .finally(() => setIsButtonLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer className="relative">
        <Link
          to="/"
          className="text-on-primary-anti-flash-white block hover:text-on-primary-anti-flash-white text-sm"
        >
          Отменить
        </Link>

        <FormHeader title="Войдите в аккаунт" />

        <div className="flex items-center mt-16">
          <p className="text-on-primary-anti-flash-white text-sm flex items-center">
            Еще нет аккаунта?
          </p>

          <TextButtonLink
            title="Зарегистрироваться"
            path="/register"
            className="w-min"
          />
        </div>

        {errors.root?.formErrors && (
          <p className="text-error-imperial-red text-xs absolute top-40">
            {errors.root.formErrors.message}
          </p>
        )}

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <DefaultInput
              className="mt-10"
              labelText="Введите email"
              placeholder="Email"
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
            <PasswordInput
              className="mt-7"
              labelText="Введите пароль"
              placeholder="Введите пароль"
              value={field.value}
              onChange={(event) => field.onChange(event.target.value)}
              error={errors.root?.password?.message}
            />
          )}
        />

        <div className="mt-4 grid grid-cols-4">
          <TextButtonLink title="Забыли пароль?" path="/reset" />
        </div>

        <div className="mt-16 grid grid-cols-3">
          <MainButton
            type="submit"
            title="Продолжить"
            handler={() => {}}
            isLoading={isButtonLoading}
            className="col-start-1 col-end-4 lg:col-start-3"
          />
        </div>
      </FormContainer>
    </form>
  );
});

export default LoginForm;
