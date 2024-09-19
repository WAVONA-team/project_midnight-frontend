import React from 'react';
import { useTranslation } from 'react-i18next';

import BackButton from '@/ui/Button/BackButton/BackButton';
import { Container } from '@/ui/Container';

export const LanguagePage: React.FC = React.memo(() => {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'languagePage',
  });

  const locales = [
    {
      name: 'English',
      code: 'en',
    },
    {
      name: 'Polski',
      code: 'pl',
    },
    {
      name: 'Русский',
      code: 'ru',
    },
    {
      name: 'Українська',
      code: 'uk',
    },
  ];

  const handleChange = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <Container
      className="
        bg-background-hight
        py-6
        sm:bg-background-default-gradient
        sm:py-12
        w-full
        h-full
      "
    >
      <div
        className="
          font-rubik
          text-on-primary-anti-flash-white
        "
      >
        <div className="flex sm:mb-3">
          <BackButton />
          <h1
            className="
              font-normal
              text-base
              tracking-wider
              sm:text-4xl
              sm:leading-10
              sm:font-openSans
            "
          >
            {t('title')}
          </h1>
        </div>

        {locales.map((locale) => {
          const { name, code } = locale;

          return (
            <div key={code} className="px-4">
              <div
                className="
                  py-5
                  border-b
                  border-secondary-jet
                  border-solid
                "
              >
                <button
                  type="button"
                  className="
                    flex
                    font-normal
                    text-sm
                    tracking-wide
                    text-on-primary-anti-flash-white
                    hover:text-on-primary-anti-flash-white
                    whitespace-nowrap
                    justify-between
                  "
                  onClick={() => handleChange(code)}
                >
                  <span>{name}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
});
