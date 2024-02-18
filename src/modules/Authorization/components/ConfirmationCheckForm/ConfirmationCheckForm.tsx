import React, { useContext, useRef } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@/components/AuthProvider/AuthProvider';

import Input from '@/ui/Input/Input';

import { ServerErrors, VerifyInputs } from '../../types';

const ConfirmationCheckForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { verify } = useContext(AuthContext);

  const symbol2Ref = useRef<HTMLInputElement>(null);
  const symbol3Ref = useRef<HTMLInputElement>(null);
  const symbol4Ref = useRef<HTMLInputElement>(null);
  const symbol5Ref = useRef<HTMLInputElement>(null);
  const symbol6Ref = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const {
    formState: { errors },
    handleSubmit,
    control,
    setError,
  } = useForm<VerifyInputs>({
    defaultValues: {
      symbol1: '',
      symbol2: '',
      symbol3: '',
      symbol4: '',
      symbol5: '',
      symbol6: '',
    },
  });

  const onSubmit: SubmitHandler<VerifyInputs> = (formData) => {
    const confirmationCode = Object.values(formData).join('');

    verify(confirmationCode)
      .then(() => navigate('/', { replace: true }))
      .catch(({ formErrors }: ServerErrors) => {
        if (formErrors) {
          setError('root', { type: 'server side', message: formErrors });
        }
      });
  };

  return (
    <form action="#" onSubmit={handleSubmit(onSubmit)}>
      <p>{errors.root?.message}</p>

      <Controller
        name="symbol1"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            value={field.value}
            onChange={(event) => {
              field.onChange(event.target.value);

              symbol2Ref.current?.focus();
            }}
            maxLength={1}
          />
        )}
      />

      <Controller
        name="symbol2"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            value={field.value}
            onChange={(event) => {
              field.onChange(event.target.value);

              symbol3Ref.current?.focus();
            }}
            maxLength={1}
            inputRef={symbol2Ref}
          />
        )}
      />

      <Controller
        name="symbol3"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            value={field.value}
            onChange={(event) => {
              field.onChange(event.target.value);

              symbol4Ref.current?.focus();
            }}
            maxLength={1}
            inputRef={symbol3Ref}
          />
        )}
      />

      <Controller
        name="symbol4"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            value={field.value}
            onChange={(event) => {
              field.onChange(event.target.value);

              symbol5Ref.current?.focus();
            }}
            maxLength={1}
            inputRef={symbol4Ref}
          />
        )}
      />

      <Controller
        name="symbol5"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            value={field.value}
            onChange={(event) => {
              field.onChange(event.target.value);

              symbol6Ref.current?.focus();
            }}
            maxLength={1}
            inputRef={symbol5Ref}
          />
        )}
      />

      <Controller
        name="symbol6"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            value={field.value}
            onChange={(event) => {
              field.onChange(event.target.value);

              submitButtonRef.current?.focus();
            }}
            maxLength={1}
            inputRef={symbol6Ref}
          />
        )}
      />

      <button ref={submitButtonRef}>Submit</button>
    </form>
  );
});

export default ConfirmationCheckForm;
