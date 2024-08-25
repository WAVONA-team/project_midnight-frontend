import React, { useState } from 'react';

import { useStore } from '@/store';
import { NormalizedUser } from 'project_midnight';

import ServiceModalContent from '@/pages/ConnectedAppsSettings/components/ServiceModalContent.tsx';

import { ServiceCard } from '@/components/ServiceCard';

import BackButton from '@/ui/Button/BackButton/BackButton.tsx';
import { Container } from '@/ui/Container';
import Modal from '@/ui/Modal/Modal';
import {
  ServiceIconApple,
  ServiceIconSoundCloud,
  ServiceIconSpotify, // ServiceIconYandex,
  ServiceIconYoutube,
} from '@/ui/ServiceIcon';

type RequiredAuthService = {
  title: string;
  icon: React.JSX.Element;
  token: string | null | undefined;
  register: () => void;
  remove: () => Promise<NormalizedUser | void>;
};

type NotRequiredAuthService = {
  title: string;
  icon: React.JSX.Element;
};

export const ConnectedAppsSettings: React.FC = React.memo(() => {
  const [currentService, setCurrentService] =
    useState<RequiredAuthService | null>(null);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<string>('');

  const { user } = useStore(({ user }) => ({
    user,
  }));

  const requireAuthServices: RequiredAuthService[] = [
    {
      title: 'Spotify',
      icon: <ServiceIconSpotify />,
      token: user?.spotifyOAUTH,
      register: () => {},
      remove: async () => {},
    },
    // {
    //   title: 'Yandex Music',
    //   icon: <ServiceIconYandex />,
    //   token: user?.yandexOAUTH,
    //   register: () => {},
    //   remove: async () => {},
    // },
    {
      title: 'Apple Music',
      icon: <ServiceIconApple />,
      token: user?.appleOAUTH,
      register: () => {},
      remove: async () => {},
    },
  ];

  const notRequireAuthServices: NotRequiredAuthService[] = [
    {
      title: 'YouTube Music',
      icon: <ServiceIconYoutube />,
    },
    {
      title: 'SoundCloud',
      icon: <ServiceIconSoundCloud />,
    },
  ];

  const enableModal = (service: RequiredAuthService) => {
    setCurrentService(service);
    setIsModalActive(true);
    document.body.style.overflow = 'hidden';
  };

  const disableModal = () => {
    setIsModalActive(false);
    document.body.style.overflow = 'auto';
  };

  const disableService = () => {
    setIsLoading(true);

    currentService!
      .remove()
      .then(() => {
        setCurrentService(null);
        setIsModalActive(false);
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        setError(error.formErrors);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
            my-5
            sm:mt-10
          "
        >
          <div className="mb-6">
            <h2 className="font-openSans font-normal text-sm md:text-2xl">
              Сервисы, не требующие авторизацию
            </h2>
          </div>

          <div className="grid grid-cols-2 md:flex gap-5 flex-wrap">
            {notRequireAuthServices.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                serviceIcon={service.icon}
                supportedTitle="Поддерживается"
              />
            ))}
          </div>
        </div>

        <div
          className="
          flex
          flex-col
          flex-wrap
          my-5
          sm:mt-10
        "
        >
          <div className="mb-6">
            <h2 className="font-openSans font-normal text-sm md:text-2xl">
              Сервисы, находящиеся в разработке
            </h2>
          </div>

          <div className="grid grid-cols-2 md:flex gap-5 flex-wrap">
            {requireAuthServices.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                serviceIcon={service.icon}
                isConnected={!!service.token}
                supportedTitle="В разработке"
                handler={() =>
                  !service.token ? service.register!() : enableModal(service)
                }
              />
            ))}
          </div>

          <Modal isModalActive={isModalActive} disableModal={disableModal}>
            <ServiceModalContent
              isLoading={isLoading}
              isError={isError}
              title={currentService?.title}
              disableModal={disableModal}
              disableService={disableService}
            />
          </Modal>
        </div>
      </div>
    </Container>
  );
});
