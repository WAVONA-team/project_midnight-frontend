import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServiceCard } from '@/components/ServiceCard';

import { ServiceIconSpotify, ServiceIconYandex } from '@/ui/ServiceIcon';

import arrowIcon from '@/assets/arrows/arrowIcon.svg';

export const ConnectedAppsSettings: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const { registerSpotify, user } = useStore(({ registerSpotify, user }) => ({
    registerSpotify,
    user,
  }));

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
            "
        >
          <img src={arrowIcon} alt="arrow" />
        </button>
        <h1
          className="
              font-normal
              text-base
              tracking-wider
              sm:text-2xl
              sm:leading-10
              sm:font-openSans
              md:sm:text-3xl
            "
        >
          Подключенные приложения
        </h1>
      </div>

      <div
        className="
          flex
          flex-wrap
          gap-5
          my-5
          sm:mt-10
        "
      >
        <ServiceCard
          title="Spotify"
          serviceIcon={<ServiceIconSpotify />}
          isConnected={!!user?.spotifyOAUTH}
          handler={registerSpotify}
        />

        <ServiceCard
          title="Yandex Music"
          serviceIcon={<ServiceIconYandex />}
          isConnected={!!user?.yandexOAUTH}
          handler={() => {}}
        />
      </div>
    </div>
  );
});
