import React, { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { UpdateResetPasswordInputs } from '@/modules/Authorization/types';
import { FormContainer } from '@/modules/Authorization/ui/FormContainer';
import { FormHeader } from '@/modules/Authorization/ui/FormHeader';

import { MainButton } from '@/ui/Button';
import { PasswordInput } from '@/ui/Input';

const UpdateResetPasswordForm: React.FC = React.memo(() => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { otp, email } = location.state || '';

  const { resetActivate, deleteResetToken } = useStore(
    ({ resetActivate, deleteResetToken }) => ({
      resetActivate,
      deleteResetToken,
    }),
  );

  const {
    formState: { errors },
    handleSubmit,
    control,
    setError,
  } = useForm<UpdateResetPasswordInputs>({
    defaultValues: {
      newPassword: '',
      confirmationPassword: '',
    },
  });

  const handleDeleteResetToken = () => {
    deleteResetToken(email && email.length ? email : null).finally(() =>
      navigate('/login', { replace: true }),
    );
  };

  const onSubmit: SubmitHandler<UpdateResetPasswordInputs> = async (
    formData,
  ) => {
    const { newPassword, confirmationPassword } = formData;

    setIsButtonLoading(true);

    await resetActivate(
      otp && otp.length ? otp : null,
      newPassword,
      confirmationPassword,
    )
      .then(() => navigate('/login', { replace: true }))
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
        <button
          type="button"
          onClick={handleDeleteResetToken}
          className="text-on-primary-anti-flash-white block hover:text-on-primary-anti-flash-white text-sm"
        >
          Отменить
        </button>

        <FormHeader title="Придумайте новый пароль" />

        {errors.root?.formErrors && (
          <p className="text-error-imperial-red text-xs absolute top-40">
            {errors.root.formErrors.message}
          </p>
        )}

        {errors.root?.resetToken && (
          <p className="text-error-imperial-red text-xs absolute top-40">
            {errors.root.resetToken.message}
          </p>
        )}

        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput
              className="mt-14"
              labelText="Введите новый пароль"
              placeholder="Введите пароль"
              onChange={(value) => field.onChange(value)}
              value={field.value}
              error={errors.root?.newPassword?.message}
            />
          )}
        />

        <Controller
          name="confirmationPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput
              className="mt-7"
              labelText="Повторите пароль"
              placeholder="Введите пароль"
              onChange={(value) => field.onChange(value)}
              value={field.value}
              error={errors.root?.confirmationPassword?.message}
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

export default UpdateResetPasswordForm;
