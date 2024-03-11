import React from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { VerifyInputs } from '@/modules/Authorization/types';

import { OTPInput } from '@/ui/Input';

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

    registerVerify(otp.length ? otp : null)
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
          <OTPInput onChange={(value) => field.onChange(value)} />
        )}
      />

      <button>Submit</button>
    </form>
  );
});

export default ConfirmationRegisterForm;
