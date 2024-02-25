import React from 'react';
import AuthCode from 'react-auth-code-input';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { ResetPasswordConfirmationInputs } from '@/modules/Authorization/types';

import Input from '@/ui/Input/Input';

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
      newPassword: '',
      confirmationPassword: '',
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordConfirmationInputs> = async (
    formData,
  ) => {
    const { otp, newPassword, confirmationPassword } = formData;

    await resetVerify(
      otp.length ? otp : null,
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
      });
  };

  return (
    <form action="#" onSubmit={handleSubmit(onSubmit)}>
      {errors.root?.formErrors && <p>{errors.root.formErrors.message}</p>}

      <label>
        {errors.root?.resetToken && <p>{errors.root.resetToken.message}</p>}

        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <AuthCode
              onChange={(value) => field.onChange(value)}
              autoFocus={false}
              inputClassName="border border-red-500"
            />
          )}
        />
      </label>

      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <Input
            value={field.value}
            type="password"
            onChange={(event) => field.onChange(event.target.value)}
            error={errors.root?.newPassword?.message}
          />
        )}
      />

      <Controller
        name="confirmationPassword"
        control={control}
        render={({ field }) => (
          <Input
            value={field.value}
            type="password"
            onChange={(event) => field.onChange(event.target.value)}
            error={errors.root?.confirmationPassword?.message}
          />
        )}
      />

      <button>Submit</button>
    </form>
  );
});

export default ConfirmationResetPasswordForm;
