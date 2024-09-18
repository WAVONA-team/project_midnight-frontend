import React, { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { RegistrationInputs } from '@/modules/Authorization/types';
import { FormCTA } from '@/modules/Authorization/ui/FormCTA';
import { FormContainer } from '@/modules/Authorization/ui/FormContainer';
import { FormError } from '@/modules/Authorization/ui/FormError';
import { FormHeader } from '@/modules/Authorization/ui/FormHeader';

import { MainButton, TextButtonLink } from '@/ui/Button';
import { DefaultInput, PasswordInput } from '@/ui/Input';

const RegistrationForm: React.FC = React.memo(() => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'registrationPage',
  });

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useStore(({ register }) => ({
    register,
  }));

  const {
    formState: { errors },
    handleSubmit,
    control,
    setError,
  } = useForm<RegistrationInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<RegistrationInputs> = async (formData) => {
    const { email, password } = formData;

    setIsButtonLoading(true);

    await register(email, password)
      .then(() => navigate('/verify', { replace: true, state: { email } }))
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-background-hight lg:bg-[transparent]"
    >
      <FormContainer className="relative">
        <Link
          to="/"
          className="text-on-primary-anti-flash-white block hover:text-on-primary-anti-flash-white text-sm"
        >
          {t('cancel')}
        </Link>

        <FormHeader title={t('title')} />

        <FormCTA
          text={t('CTAQuestion')}
          action={
            <TextButtonLink title={t('CTA')} path="/login" className="w-min" />
          }
        />

        {errors.root?.formErrors && (
          <FormError text={errors.root.formErrors.message as string} />
        )}

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <DefaultInput
              className="mt-10"
              labelText={t('emailLabel')}
              placeholder={t('emailPlaceholder')}
              value={field.value}
              onChange={(event) => field.onChange(event.target.value)}
              error={errors.root?.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              className="mt-7"
              labelText={t('passwordLabel')}
              placeholder={t('passwordPlaceholder')}
              value={field.value}
              onChange={(event) => field.onChange(event.target.value)}
              error={errors.root?.password?.message}
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

export default RegistrationForm;
