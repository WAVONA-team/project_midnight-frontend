import React, { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { VerifyInputs } from '@/modules/Authorization/types';
import { FormContainer } from '@/modules/Authorization/ui/FormContainer';
import { FormError } from '@/modules/Authorization/ui/FormError';
import { FormHeader } from '@/modules/Authorization/ui/FormHeader';

import { MainButton, TextButton } from '@/ui/Button';
import { OTPInput } from '@/ui/Input';

const ConfirmationRegisterForm: React.FC = React.memo(() => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'confirmationRegister',
  });

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || '';
  const { registerVerify, deleteUser, resendCode } = useStore(
    ({ registerVerify, deleteUser, resendCode }) => ({
      registerVerify,
      deleteUser,
      resendCode,
    }),
  );

  const {
    formState: { errors },
    handleSubmit,
    control,
    setError,
  } = useForm<VerifyInputs>({
    defaultValues: {
      otp: '',
    },
  });

  const handleDelete = () => {
    deleteUser(email && email.length ? email : null).finally(() =>
      navigate('/login', { replace: true }),
    );
  };

  const handleResetCode = () => {
    resendCode(email && email.length ? email : null).catch(
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

  const onSubmit: SubmitHandler<VerifyInputs> = (formData) => {
    const { otp } = formData;

    setIsButtonLoading(true);

    registerVerify(otp.length ? otp : null)
      .then(() => navigate('/tracks', { replace: true }))
      .catch(({ formErrors }: ServerErrors) => {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-background-hight lg:bg-[transparent]"
    >
      <FormContainer className="relative">
        <button
          type="button"
          className="text-on-primary-anti-flash-white block hover:text-on-primary-anti-flash-white text-sm"
          onClick={handleDelete}
        >
          {t('cancel')}
        </button>

        <FormHeader title={t('title')} />

        <p className="text-on-primary-anti-flash-white text-sm block mt-3">
          {t('annotation')}
        </p>

        <TextButton
          className="mt-16 !justify-start"
          title={t('repeat')}
          handler={handleResetCode}
        />

        {errors.root?.formErrors && (
          <FormError text={errors.root.formErrors.message as string} />
        )}

        {errors.root?.email && (
          <p className="text-error-imperial-red text-xs absolute top-40">
            {errors.root.email.message}
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
            title={t('submit')}
            handler={() => {}}
            isLoading={isButtonLoading}
            className="col-start-1 col-end-4 lg:col-start-3"
          />
        </div>
      </FormContainer>
    </form>
  );
});

export default ConfirmationRegisterForm;
