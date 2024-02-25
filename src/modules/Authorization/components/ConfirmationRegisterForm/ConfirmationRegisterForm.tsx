import { useStore } from '@/store';

import React from 'react';
import AuthCode from 'react-auth-code-input';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { VerifyInputs } from '../../types';

const ConfirmationRegisterForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { registerVerify } = useStore(({ registerVerify }) => ({
    registerVerify,
  }));

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

  const onSubmit: SubmitHandler<VerifyInputs> = (formData) => {
    const { otp } = formData;

    registerVerify(otp)
      .then(() => navigate('/', { replace: true }))
      .catch(({ formErrors }: ServerErrors) => {
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
          <AuthCode
            onChange={(value) => field.onChange(value)}
            autoFocus={false}
            inputClassName="border border-red-500"
          />
        )}
      />

      <button>Submit</button>
    </form>
  );
});

export default ConfirmationRegisterForm;
