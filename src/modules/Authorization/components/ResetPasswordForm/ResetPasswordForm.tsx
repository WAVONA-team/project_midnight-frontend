import React, { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { ResetPasswordInputs } from '@/modules/Authorization/types';
import { FormContainer } from '@/modules/Authorization/ui/FormContainer';

import { MainButton, TextButtonLink } from '@/ui/Button';
import { DefaultInput } from '@/ui/Input';

const ResetPasswordForm: React.FC = React.memo(() => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const navigate = useNavigate();
  const { reset } = useStore(({ reset }) => ({
    reset,
  }));
  const {
    formState: { errors },
    handleSubmit,
    control,
    setError,
  } = useForm<ResetPasswordInputs>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async (formData) => {
    const { email } = formData;

    setIsButtonLoading(true);

    await reset(email)
      .then(() =>
        navigate('/reset-verify', { replace: true, state: { email } }),
      )
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

        <h2 className="text-on-primary-anti-flash-white font-rubik font-semibold text-2xl block mt-10 lg:font-openSans lg:font-normal">
          Сброс пароля
        </h2>

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

export default ResetPasswordForm;
