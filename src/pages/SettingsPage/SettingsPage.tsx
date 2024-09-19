import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useStore } from '@/store';

import ExitModalContent from '@/pages/SettingsPage/components/ExitModalContent.tsx';

import { createPlayerSlice } from '@/modules/Player/store';

import BackButton from '@/ui/Button/BackButton/BackButton.tsx';
import { Container } from '@/ui/Container';

import arrowIcon from '../../../public/arrows/arrowIcon.svg';
import Modal from '../../ui/Modal/Modal.tsx';

export const SettingsPage: React.FC = React.memo(() => {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'settingsPage',
  });

  const locales = {
    en: 'English',
    pl: 'Polski',
    ru: 'Русский',
    uk: 'Українська',
  };

  const { changePlayerState, changeCurrentTrack } = createPlayerSlice();
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const { logout, clearUserPlaylist, user } = useStore(
    ({ logout, clearUserPlaylist, user }) => ({
      logout,
      clearUserPlaylist,
      user,
    }),
  );

  const logoutHandler = async () => {
    clearUserPlaylist();
    changePlayerState(false);
    changeCurrentTrack(null);
    logout();
  };

  const enableModal = () => {
    setIsModalActive(true);
    document.body.style.overflow = 'hidden';
  };

  const disableModal = () => {
    setIsModalActive(false);
    document.body.style.overflow = 'auto';
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
            {t('title')}
          </h1>
        </div>

        <div>
          <h3 className="font-rubik text-base font-normal">
            {t('account')}{' '}
            <span className="text-secondary-satin-sheen-gold">
              {user?.email}
            </span>
          </h3>
        </div>

        <div className="px-4">
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
                justify-between
              "
              to="connected-apps"
            >
              <span>{t('connectedApps')}</span>
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
                justify-between
              "
              to="language"
            >
              <span>{t('language')}</span>

              <div className="flex items-center text-base text-secondary-cadet-gray">
                <p>
                  {locales[i18n.language as keyof typeof locales]}
                </p>

                <img
                  className="
                    px-1.5
                    ml-2
                    rotate-180
                  "
                  src={arrowIcon}
                  alt="Arrow Icon"
                />
              </div>
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
              onClick={enableModal}
            >
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>

        <Modal isModalActive={isModalActive} disableModal={disableModal}>
          <ExitModalContent
            disableModal={disableModal}
            exitHandler={logoutHandler}
          />
        </Modal>
      </div>
    </Container>
  );
});
