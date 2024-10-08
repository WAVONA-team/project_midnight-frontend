import React, { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServerErrors } from '@/shared/types/ServerErrors';

import { LoginInputs } from '@/modules/Authorization/types';
import { FormCTA } from '@/modules/Authorization/ui/FormCTA';
import { FormContainer } from '@/modules/Authorization/ui/FormContainer';
import { FormError } from '@/modules/Authorization/ui/FormError';
import { FormHeader } from '@/modules/Authorization/ui/FormHeader';

import { MainButton, TextButtonLink } from '@/ui/Button';
import { DefaultInput, PasswordInput } from '@/ui/Input';

const LoginForm: React.FC = React.memo(() => {
  const { t } = useTranslation('translation', { keyPrefix: 'loginPage' });

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useStore(({ login }) => ({
    login,
  }));
  const {
    formState: { errors },
    handleSubmit,
    control,
    setError,
  } = useForm<LoginInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (formData) => {
    const { email, password } = formData;

    setIsButtonLoading(true);

    await login(email, password)
      .then(() => navigate('/tracks', { replace: true }))
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
            <TextButtonLink
              title={t('CTA')}
              path="/register"
              className="w-min"
            />
          }
        />

        {(errors.root?.formErrors || errors.root?.id) && (
          <FormError
            text={
              (errors.root.formErrors?.message ||
                errors.root.id?.message) as string
            }
          />
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

        <TextButtonLink
          title={t('forgetPassword')}
          path="/reset"
          className="block mt-4 !text-left"
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

export default LoginForm;
