import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { ServiceCard } from '@/components/ServiceCard';

import { Container } from '@/ui/Container';
import { ServiceIconSpotify, ServiceIconYandex } from '@/ui/ServiceIcon';

import arrowIcon from '@/assets/arrows/arrowIcon.svg';

export const ConnectedAppsSettings: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const { registerSpotify, removeSpotify, user } = useStore(
    ({ registerSpotify, removeSpotify, user }) => ({
      registerSpotify,
      removeSpotify,
      user,
    }),
  );

  return (
    <Container>
      <div
        className="
        font-rubik
        bg-background-hight
        text-on-primary-anti-flash-white
        max-w-full
        h-dvh
        sm:bg-background-default-gradient
        sm:max-w-full
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
            handler={() =>
              !user?.spotifyOAUTH ? registerSpotify : removeSpotify(user.id)
            }
          />

          <ServiceCard
            title="Yandex Music"
            serviceIcon={<ServiceIconYandex />}
            isConnected={!!user?.yandexOAUTH}
            handler={() => {}}
          />
        </div>
      </div>
    </Container>
  );
});
