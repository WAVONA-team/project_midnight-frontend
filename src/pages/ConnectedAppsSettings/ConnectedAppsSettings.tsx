import React, { useState } from 'react';

import { useStore } from '@/store';
import { NormalizedUser } from 'project_midnight';

import ServiceModalContent from '@/pages/ConnectedAppsSettings/components/ServiceModalContent.tsx';

import { ServiceCard } from '@/components/ServiceCard';

import BackButton from '@/ui/Button/BackButton/BackButton.tsx';
import { Container } from '@/ui/Container';
import Modal from '@/ui/Modal/Modal';
import { ServiceIconSpotify, ServiceIconYandex } from '@/ui/ServiceIcon';

type Service = {
  title: string;
  icon: React.JSX.Element;
  token: string | null | undefined;
  register: () => void;
  remove: () => Promise<NormalizedUser>;
};

export const ConnectedAppsSettings: React.FC = React.memo(() => {
  const [currentService, setCurrentService] = useState<Service>();
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<string>('');

  const { registerSpotify, removeSpotify, user } = useStore(
    ({ registerSpotify, removeSpotify, user }) => ({
      registerSpotify,
      removeSpotify,
      user,
    }),
  );

  const services: Service[] = [
    {
      title: 'Spotify',
      icon: <ServiceIconSpotify />,
      token: user?.spotifyOAUTH,
      register: registerSpotify,
      remove: async () => removeSpotify(user!.id),
    },
    {
      title: 'Yandex Music',
      icon: <ServiceIconYandex />,
      token: user?.yandexOAUTH,
      register: () => {},
      remove: async () => removeSpotify(user!.id),
    },
  ];

  const enableModal = (service: Service) => {
    setCurrentService(service);
    setIsModalActive(true);
    document.body.style.overflow = 'hidden';
  };

  const disableModal = () => {
    setIsLoading(true);
    document.body.style.overflow = 'auto';

    currentService
      ?.remove()
      .then(() => {
        setIsModalActive(false);
      })
      .catch((error) => {
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
          flex
          flex-wrap
          gap-5
          my-5
          sm:mt-10
        "
        >
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              serviceIcon={service.icon}
              isConnected={!!service.token}
              handler={() =>
                !service.token ? service.register() : enableModal(service)
              }
            />
          ))}

          <Modal isActive={isModalActive} disableModal={disableModal}>
            <ServiceModalContent
              isLoading={isLoading}
              isError={isError}
              title={currentService?.title}
              handler={disableModal}
            />
          </Modal>
        </div>
      </div>
    </Container>
  );
});
