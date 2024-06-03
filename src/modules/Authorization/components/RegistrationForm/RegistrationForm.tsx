import React, { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { RegistrationInputs } from '@/modules/Authorization/types';
import { FormCTA } from '@/modules/Authorization/ui/FormCTA';
import { FormContainer } from '@/modules/Authorization/ui/FormContainer';
import { FormError } from '@/modules/Authorization/ui/FormError';
import { FormHeader } from '@/modules/Authorization/ui/FormHeader';

import { MainButton, TextButtonLink } from '@/ui/Button';
import { DefaultInput, PasswordInput } from '@/ui/Input';

const RegistrationForm: React.FC = React.memo(() => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
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

    setIsButtonLoading(true);

    await register(email, password)
      .then(() => navigate('/verify', { replace: true, state: { email } }))
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
    <form onSubmit={handleSubmit(onSubmit)} className="bg-background-hight lg:bg-[transparent]">
      <FormContainer className="relative">
        <Link
          to="/"
          className="text-on-primary-anti-flash-white block hover:text-on-primary-anti-flash-white text-sm"
        >
          Отменить
        </Link>

        <FormHeader title="Создайте аккаунт" />

        <FormCTA
          text="Уже есть аккаунт?"
          action={
            <TextButtonLink title="Войти" path="/login" className="w-min" />
          }
        />

        {errors.root?.formErrors && (
          <FormError text={errors.root.formErrors.message as string} />
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

export default RegistrationForm;
