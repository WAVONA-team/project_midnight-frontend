import React from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { ResetPasswordConfirmationInputs } from '@/modules/Authorization/types';

import OTPInput from '@/ui/OTPInput/OTPInput';

const ConfirmationResetPasswordForm: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const { resetVerify } = useStore(({ resetVerify }) => ({
    resetVerify,
  }));

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

  const onSubmit: SubmitHandler<ResetPasswordConfirmationInputs> = async (
    formData,
  ) => {
    const { otp } = formData;

    await resetVerify(otp.length ? otp : null)
      .then(() => navigate('/reset-update', { replace: true, state: { otp } }))
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
      {errors.root?.formErrors && <p>{errors.root.formErrors.message}</p>}

      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <OTPInput
            onChange={(value) => field.onChange(value)}
            error={errors.root?.resetToken?.message}
          />
        )}
      />

      <button>Submit</button>
    </form>
  );
});

export default ConfirmationResetPasswordForm;
