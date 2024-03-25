import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import arrowIcon from '@/assets/arrows/arrowIcon.svg';

export const SettingsPage: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const { logout } = useStore(({ logout }) => ({ logout }));

  return (
    <div
      className="
        font-rubik
        bg-background-hight
        text-on-primary-anti-flash-white
        max-w-full
        h-dvh
        px-[16px]
        py-[24px]
        sm:bg-background-default-gradient
        sm:max-w-full
        sm:px-[80px]
      "
    >
      <div className="flex">
        <button
          onClick={() => navigate(-1)}
          className="
            px-1.5
            mr-2
            focus:outline-none
            sm:hidden
          "
        >
          <img src={arrowIcon} alt="Arrow Icon" />
        </button>
        <h1
          className="
            font-normal
            text-base
            tracking-wider
            sm:text-4xl
            sm:leading-10
            sm:mb-3
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
          <span>Выход</span>
        </button>
      </div>
    </div>
  );
});
