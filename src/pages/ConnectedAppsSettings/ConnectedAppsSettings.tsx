import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useStore } from '@/store';
import { NormalizedUser } from 'project_midnight';

import { ServiceCard } from '@/components/ServiceCard';

import arrowIcon from '@/assets/arrows/arrowIcon.svg';
import spotifyIcon from '@/assets/services/spotifyIcon.svg';
import yandexMusicIcon from '@/assets/services/yandexMusicIcon.svg';

export const ConnectedAppsSettings: React.FC<NormalizedUser> = React.memo(
  ({ spotifyOAUTH, yandexOAUTH }) => {
    const navigate = useNavigate();

    const { registerSpotify } = useStore(({ registerSpotify }) => ({
      registerSpotify,
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
            serviceIcon={
              <div
                className="
                  rounded-md
                  flex justify-center
                  w-[48px] h-[48px]
                  shadow-service-icon-spotify
                  bg-service-icon-gradient
                "
              >
                <img
                  className="rounded-md"
                  src={spotifyIcon}
                  alt="Spotify Icon"
                />
              </div>
            }
            isConnected={spotifyOAUTH !== null}
            handler={registerSpotify}
          />

          <ServiceCard
            title="Yandex Music"
            serviceIcon={
              <div
                className="
                  rounded-md
                  flex justify-center
                  w-[48px] h-[48px]
                  shadow-service-icon-yandex
                  bg-service-icon-yandex-gradient
                "
              >
                <img
                  className="rounded-md"
                  src={yandexMusicIcon}
                  alt="Yandex Music Icon"
                />
              </div>
            }
            isConnected={yandexOAUTH !== null}
            handler={() => {}}
          />
        </div>
      </div>
    );
  },
);
