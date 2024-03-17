import React, { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { ResetPasswordConfirmationInputs } from '@/modules/Authorization/types';
import { FormContainer } from '@/modules/Authorization/ui/FormContainer';

import { MainButton, TextButton } from '@/ui/Button';
import { OTPInput } from '@/ui/Input';

const ConfirmationResetPasswordForm: React.FC = React.memo(() => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || '';
  const { resetVerify, deleteResetToken, resendResetToken } = useStore(
    ({ resetVerify, deleteResetToken, resendResetToken }) => ({
      resetVerify,
      deleteResetToken,
      resendResetToken,
    }),
  );

  const {
    formState: { errors },
    handleSubmit,
    control,
    setError,
  } = useForm<ResetPasswordConfirmationInputs>({
    defaultValues: {
      otp: '',
    },
  });

  const handleDeleteResetToken = () => {
    deleteResetToken(email && email.length ? email : null).finally(() =>
      navigate('/login', { replace: true }),
    );
  };

  const handleResetResetToken = () => {
    resendResetToken(email && email.length ? email : null).catch(
      ({ fieldErrors, formErrors }: ServerErrors) => {
        if (formErrors) {
          setError('root.formErrors', {
            type: 'server side',
            message: formErrors,
          });
        }

        if (fieldErrors) {
          fieldErrors.forEach((serverError) => {
            const { name, message } = serverError;

            setError(`root.${name}`, { type: 'server side', message });
          });
        }
      },
    );
  };

  const onSubmit: SubmitHandler<ResetPasswordConfirmationInputs> = async (
    formData,
  ) => {
    const { otp } = formData;

    setIsButtonLoading(true);

    await resetVerify(otp.length ? otp : null)
      .then(() => navigate('/reset-update', { replace: true, state: { otp, email } }))
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
          className="text-on-primary-anti-flash-white block hover:text-on-primary-anti-flash-white text-sm"
          onClick={handleDeleteResetToken}
        >
          Отменить
        </button>

        <h2 className="text-on-primary-anti-flash-white font-rubik font-semibold text-2xl block mt-10 lg:font-openSans lg:font-normal">
          Сброс пароля
        </h2>

        <p className="text-on-primary-anti-flash-white text-sm block mt-16">
          Введите код, отправленный на указанную почту
        </p>

        <TextButton
          className="mt-8 !justify-start"
          title="Отправить код еще раз"
          handler={handleResetResetToken}
        />

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
          name="otp"
          control={control}
          render={({ field }) => (
            <OTPInput
              onChange={(value) => field.onChange(value)}
              containerClassName="justify-center mt-24"
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

export default ConfirmationResetPasswordForm;
