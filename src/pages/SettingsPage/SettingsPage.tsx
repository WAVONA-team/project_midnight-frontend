import React from 'react';
import { Link } from 'react-router-dom';

import { useStore } from '@/store';

import BackButton from '@/ui/Button/BackButton/BackButton.tsx';
import { Container } from '@/ui/Container';

import arrowIcon from '../../../public/arrows/arrowIcon.svg';

export const SettingsPage: React.FC = React.memo(() => {
  const { logout } = useStore(({ logout }) => ({ logout }));

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
          <BackButton className="sm:hidden" />
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
            Настройки
          </h1>
        </div>

        <div
          className="
          py-5
          border-b
          border-secondary-jet
          border-solid
        "
        >
          <Link
            className="
            flex
            font-normal
            text-sm
            tracking-wide
            text-on-primary-anti-flash-white
            hover:text-on-primary-anti-flash-white
            whitespace-nowrap
            sm:justify-between
          "
            to="connected-apps"
          >
            <span>Подключенные приложения</span>
            <img
              className="
              px-1.5
              ml-2
              rotate-180
            "
              src={arrowIcon}
              alt="Arrow Icon"
            />
          </Link>
        </div>

        <div
          className="
          py-4
          font-normal
          text-sm
          tracking-wide
          sm:border-b
          sm:border-secondary-jet
          sm:border-solid
        "
        >
          <button
            className="
            w-full
            text-start
            focus:outline-none
          "
            onClick={logout}
          >
            <span>Выйти</span>
          </button>
        </div>
      </div>
    </Container>
  );
});
