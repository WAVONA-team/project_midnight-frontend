import React from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { UpdateResetPasswordInputs } from '@/modules/Authorization/types';

import Input from '@/ui/Input/Input';

const UpdateResetPasswordForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { otp } = location.state;

  const { resetActivate } = useStore(({ resetActivate }) => ({
    resetActivate,
  }));

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

  const onSubmit: SubmitHandler<UpdateResetPasswordInputs> = async (
    formData,
  ) => {
    const { newPassword, confirmationPassword } = formData;

    await resetActivate(otp, newPassword, confirmationPassword)
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

      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <Input
            onChange={(value) => field.onChange(value)}
            value={field.value}
            type="password"
            error={errors.root?.newPassword?.message}
          />
        )}
      />

      <Controller
        name="confirmationPassword"
        control={control}
        render={({ field }) => (
          <Input
            onChange={(value) => field.onChange(value)}
            value={field.value}
            type="password"
            error={errors.root?.confirmationPassword?.message}
          />
        )}
      />

      <button>Submit</button>
    </form>
  );
});

export default UpdateResetPasswordForm;
