import React from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { ResetPasswordInputs } from '@/modules/Authorization/types';

import { DefaultInput } from '@/ui/Input';

const ResetPasswordForm: React.FC = React.memo(() => {
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

    await reset(email)
      .then(() => navigate('/reset-verify', { replace: true }))
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
        name="email"
        control={control}
        render={({ field }) => (
          <DefaultInput
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
            error={errors.root?.email?.message}
          />
        )}
      />

      <button>Submit</button>
    </form>
  );
});

export default ResetPasswordForm;
