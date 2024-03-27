import React from 'react';

import { useStore } from '@/store';

import { ServiceCard } from '@/components/ServiceCard';

import BackButton from '@/ui/Button/BackButton/BackButton.tsx';
import { Container } from '@/ui/Container';
import { ServiceIconSpotify, ServiceIconYandex } from '@/ui/ServiceIcon';

export const ConnectedAppsSettings: React.FC = React.memo(() => {
  const { registerSpotify, removeSpotify, user } = useStore(
    ({ registerSpotify, removeSpotify, user }) => ({
      registerSpotify,
      removeSpotify,
      user,
    }),
  );

  return (
    <Container
      className="
        bg-background-hight
        py-6
        sm:bg-background-default-gradient
        sm:py-12
      "
    >
      <div
        className="
        font-rubik
        text-on-primary-anti-flash-white
        max-w-full
        h-dvh
        sm:max-w-full
      "
      >
        <div className="flex">
          <BackButton />
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
              !user?.spotifyOAUTH ? registerSpotify() : removeSpotify(user.id)
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
